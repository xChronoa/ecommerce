import React from "react";

// View Cart Component
const ViewCart = (props) => {
    const totalPrice = props.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    const totalQuantity = props.cart.reduce((totalQuantity, item) => {
        return totalQuantity + item.quantity;
    }, 0);

    return (
        <div className="cart-summary d-flex justify-content-start flex-column m-5 min-vh-100">
            <h4>Cart Summary</h4>
            
            {props.cart.length > 0 ? (
                <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item rounded-top">
                        <span className="flex-fill col-6">Product</span>
                        <span className="flex-fill text-center col-2">Price</span>
                        <span className="flex-fill text-center col-4">Quantity</span>
                        <div class="filler-header"></div>
                    </li>
                    {props.cart.map((item, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center list-group-item ">
                            <span className="flex-fill product-name col-6">{item.name}</span>
                            <span className="flex-fill product-price text-center col-2"> 
                                ₱ {item.price.toLocaleString('en-PH', {maximumFractionDigits: 2, minimumFractionDigits: 2})} 
                            </span>
                            <span className="flex-fill product-quantity text-center col-4"> {item.quantity}</span>
                            <button
                                onClick={() => props.removeFromCart(item.id)}
                                className="flex-fill btn btn-outline-danger"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                    <div className="price-summary d-flex flex-row justify-content-between mt-4">
                        <h4 className="fs-5"> 
                            Total Price: ₱ {totalPrice.toLocaleString('en-PH', {maximumFractionDigits: 2, minimumFractionDigits: 2})} 
                        </h4>
                        <h4 className="fs-5"> Total Products: {totalQuantity} </h4>
                    </div>
                    <div className="checkout-control d-flex flex-row justify-content-end my-3">
                        <button className="btnCheckout btn btn-success w-100 fs-5 fw-bold" onClick={() => props.checkOut()}>Check Out</button>
                    </div>
                </ul>
            ) : (
                <ul className="list-group">
                    <li className="d-flex justify-content-between align-items-center list-group-item rounded-top">
                        <span className="flex-fill col-6">Product</span>
                        <span className="flex-fill text-center col-2">Price</span>
                        <span className="flex-fill text-center col-4">Quantity</span>
                        <div class="filler-header"></div>
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
