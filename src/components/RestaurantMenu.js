import { useState, useEffect} from 'react'
const RestaurantMenu = () => {
    useEffect(()=>{
        fetchMenu();
    },[])
    const fetchMenu = async() =>{
            const data = await fetch('https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=23681&catalog_qa=undefined&submitAction=ENTER');
            const json = await data.json();
            console.log("Displaying data", json);
        }
    return (
        <div>
            <h1>Test restaurant</h1>
            <h2>Sample Menu</h2>
            <ul>
                <li>Pizza</li>
                <li>Burger</li>
                <li>Pasta</li>
                <li>Salad</li>
                <li>Soda</li>
            </ul>
        </div>
    );
};

export default RestaurantMenu;
