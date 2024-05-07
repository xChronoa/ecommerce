import React from "react";
import { useCart } from "./utils";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { ToastContainer } from "react-toastify";

// View Cart Component
const ViewCart = () => {
    const { cart, loading, cartTotal, removeFromCart } = useCart();

    // To fetch data before rendering page.
    if (loading) {
        return <Loading />
    }

    return (
        <div className="cart-summary d-flex justify-content-start flex-column m-5 min-vh-100">
            <ToastContainer />
            <h4>Cart Summary</h4>
            
            {cart.data.length > 0 ? (
                <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item rounded-top">
                        <span className="flex-fill col-6">Product</span>
                        <span className="flex-fill text-center col-2">Price</span>
                        <span className="flex-fill text-center col-4">Quantity</span>
                        <div className="filler-header"></div>
                    </li>
                    {cart.data.map((item, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center list-group-item">
                            <span className="flex-fill product-name col-6">{item.name}</span>
                            <span className="flex-fill product-price text-center col-2"> 
                                ₱ {item.price.toLocaleString('en-PH', {maximumFractionDigits: 2, minimumFractionDigits: 2})} 
                            </span>
                            <span className="flex-fill product-quantity text-center col-4"> {item.quantity}</span>
                            <button
                                onClick={() => { 
                                    removeFromCart(item.id);
                                }}
                                className="flex-fill btn btn-outline-danger"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                    <div className="price-summary d-flex flex-row justify-content-between mt-4">
                        <h4 className="fs-5"> 
                            Total Price: ₱ {cartTotal.totalPrice.toLocaleString('en-PH', {maximumFractionDigits: 2, minimumFractionDigits: 2})} 
                        </h4>
                        <h4 className="fs-5"> Total Products: {cartTotal.totalQuantity} </h4>
                    </div>
                    <div className="checkout-control d-flex flex-row justify-content-end my-3">
                        <button className="btnCheckout btn btn-success w-100 fs-5 fw-bold">
                            <Link to="/checkout" className="text-white fw-bold text-decoration-none p-2">
                                Continue to Checkout
                            </Link>
                        </button>
                    </div>
                </ul>
            ) : (
                <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item rounded-top">
                        <span className="flex-fill col-6">Product</span>
                        <span className="flex-fill text-center col-2">Price</span>
                        <span className="flex-fill text-center col-4">Quantity</span>
                        <div className="filler-header"></div>
                    </li>
                    <li className="text-center list-group-item">
                        There are currently no items in the cart.
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ViewCart;
