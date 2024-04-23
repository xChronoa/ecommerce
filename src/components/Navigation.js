// Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="bg-dark navbar navbar-expand-lg ">
            <ul className="navbar-nav mx-auto fs-6 gap-4">
                <li class="nav-item position-relative">    
                    <NavLink to="/home" className="nav-link text-white text-center fw-bold px-3 rounded-2">Home</NavLink>
                </li>
                <li class="nav-item position-relative">
                    <NavLink to="/viewcart" className="nav-link text-white text-center fw-bold px-3 rounded-2">My Cart</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;