import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import AboutLayout from "./components/About";
import ContactLayout from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
//Experimenting a bit with inline styles
const inLineStyle ={
    backgroundColor: "#f0f0f0",
};
const AppLayout = () => {
    return(

        <div className = "app">
            <Header />   
            <Outlet />
        </div>
    );
}
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <div>Router Error: Check console for details</div>,
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path: "about",
                element: <AboutLayout/>
            },
            {
                path: "contact",
                element: <ContactLayout/>
            },
            {
                path: "restaurants/:resId",
                element: <RestaurantMenu />,
                errorElement: <div>Couldn’t load that restaurant!</div>
            },
            {
                path: "test-simple",
                element: <div><h1>SIMPLE TEST WORKS</h1></div>
            }
        ]
    }
]);
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {appRouter}/>);