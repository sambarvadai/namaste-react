import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState , useEffect, useRef} from "react";
import throttle from "lodash.throttle";
const Body = () =>{
    const [resto,setResto] = useState([]);
    const [filteredResto,setFilteredResto] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [nextOffset, setNextOffset] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [widgetOffset, setWidgetOffset] = useState({});
    const [filters, setFilters] = useState({});
const [seoParams, setSeoParams] = useState({});
const isPollingRef = useRef(false);
const scrollThrottle = useRef(null);
    useEffect(()=>{
        fetchData();
    }, []);
    const fetchData = async() =>{
        setLoading(true);
        const encodedURL = encodeURIComponent("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const data = await fetch(
            `https://corsproxy.io/?url=${encodedURL}`
        );
        const json = await data.json();
        console.log("This is firing from fetchData")
        //optional chaining
        setResto(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredResto(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setNextOffset(json.data.pageOffset.nextOffset);
        setWidgetOffset(json.data.pageOffset.widgetOffset);
        setFilters(json.data.filters || {});
        setSeoParams(json.data.seoParams || {});
        console.log(nextOffset)
        setLoading(false);
    };
    const updateData = async()=>{
        if(isPollingRef.current) return; // Prevent multiple fetches
        isPollingRef.current = true;
        setLoading(true);
        const data = await fetch(
            "http://localhost:3001/swiggy-update",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "lat": 12.9352403,
                    "lng": 77.624532,
                    nextOffset,
                    "page_type": "DESKTOP_WEB_LISTING",
                    widgetOffset,
                    filters,
                    seoParams,
            }),

    });
    const json = await data.json();
    console.log("Firing from updatedData :", json?.data?.cards[0]);
    console.log("Updateddata(should contain new resto data):", json);
    //We have updated data here. Now we need to append this to the existing data.
    const newBatch = json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants||[];
    setResto((prev)=>[...prev, ...newBatch]);
    setFilteredResto((prev)=>[...prev, ...newBatch]);
    const noff = json?.data?.pageOffset?.nextOffset;
    const woff = json?.data?.pageOffset?.widgetOffset;
    setNextOffset(noff);
    setWidgetOffset(woff);

    const continueFetch = woff.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
    if(!continueFetch){
        setHasMore(false);
    }
    isPollingRef.current = false; // Reset the flag after fetching
    setLoading(false);
};

useEffect(() => {
    scrollThrottle.current = throttle(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore &&
        !loading &&
        !isPollingRef.current
      ) {
        updateData();
      }
    }, 3000); // Throttle interval: 3s
  }, [hasMore, loading, nextOffset, widgetOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottle.current) {
        scrollThrottle.current();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    //Conditional rendering 
    if(resto.length===0){
        return <Shimmer/>
    }
    return (resto.length===0)? <Shimmer/> :(
        <div className="body" >
            <div className="filter">
            <div className="search">
                <input type="text" placeholder="Search" value={searchText} onChange={(e)=>{
                    setSearchText(e.target.value);
                    console.log(e.target.value);
                }}></input>
                <button className="search-btn" onClick={()=>{
                    const filteredResto = resto.filter((resto)=>resto?.info?.name.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredResto(filteredResto);
                }} >Search</button>
            </div>
                <button className="filter-button"  onClick={() =>{
                const filteredResto = resto.filter((resto) => resto?.info?.avgRating >= 4.4);
                setFilteredResto(filteredResto);
            }}>Top Rated Restaurants</button>
            </div> 
            <div className="restaurant-container" >
{
    filteredResto.map(resto => <RestaurantCard key={resto.info.id} resData={resto}/>)//Restructured using map function - JS Functional Programming
    }
        </div>
        </div>
    );
};
export default Body;