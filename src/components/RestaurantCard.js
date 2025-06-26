import { CDN_URL } from "./utils/constants";
const inLineStyle ={
    backgroundColor: "#f0f0f0",
};
const RestaurantCard =(props) =>{
    const {resData} = props;
    const {cloudinaryImageId,name,cuisines,avgRating,sla,costForTwo} = resData.info;
    //Notice that here we are doing a sort of dual layer destructuring. First we are destructuring the props object to get the resData object and then we are destructuring the resData object to get the individual properties.
return(
<div className="restaurant-card" style={inLineStyle}>
    <img src={CDN_URL+cloudinaryImageId} alt="res-img" className="res-logo"/>
    <h3>{name}</h3>
    <h4 className="cuisines">{cuisines.join(", ")}</h4>
    <h4>{avgRating} stars</h4>
    <h4>{costForTwo}</h4>
    <h4>{sla.slaString}</h4>
</div>
);
};
export default RestaurantCard