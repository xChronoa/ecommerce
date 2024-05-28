// Home.js
import React from "react";
import { Link } from "react-router-dom";
import logo from '../Resources/logo_med.png';

const Home = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-0 p-0 min-vh-100">
            <div className="home-contents d-flex flex-column text-center mx-5">
                <img src={logo} alt="Logo" className="logo"/>
                <button className="btnProceed btn btn-secondary ">
                    <Link to="/product" className="text-white fw-bold text-decoration-none p-2">
                        Proceed to Shopping
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Home;