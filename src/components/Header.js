//Keep file name the same as component name: Good practice to do so.
import { useState } from "react";
import { LOGO_URL } from "./utils/constants";
import { Link } from "react-router";
const Header = () =>{
    const [btnState,setState] = useState("Login");
    return(
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} />
            </div>
            <div className="nav-items">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li> <Link to="/contact">Contact Us</Link></li>
            <li>Cart</li>
            <button className="login"
            onClick={()=>{
                btnState==="Login"?setState("Logout"):setState("Login");
            }}>{btnState}</button>
        </ul>
            </div>
        </div>
    );
};
export default Header;