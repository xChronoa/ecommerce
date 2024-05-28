// Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="bg-dark navbar navbar-expand-lg ">
            <ul className="navbar-nav mx-auto fs-6 gap-4">
                <li className="nav-item position-relative">    
                    <NavLink to="/admin/manage/users" className="nav-link text-white text-center fw-bold px-3 rounded-2">Manage Users</NavLink>
                </li>
                <li className="nav-item position-relative">    
                    <NavLink to="/admin/manage/products" className="nav-link text-white text-center fw-bold px-3 rounded-2">Manage Products</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;