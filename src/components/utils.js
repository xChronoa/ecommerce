import React, { useState } from "react";

export function useCart() {
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);

    // C. Add to Cart Functionality
    const addToCart = (product) => {
        const productIndex = cart.findIndex((item) => item.id === product.id);

        // Check if product already exists in the cart, if so increment its quantity, otherwise create it.
        if (productIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[productIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            const newCart = [...cart, {...product, quantity: 1}];
            setCart(newCart)
        }
        // alert("Item added to cart.");
    };

    // Remove from Cart Functionality
    const removeFromCart = (productToRemove) => {
        if(window.confirm("Are you sure you want to remove this product from your cart?")) {
            setCart(cart.filter(product => product.id !== productToRemove));
        }
    };

    const checkOut = () => {
        setOrder([...order, ...cart]);
        setCart([]);
        alert("Order successful!");
    }

    return { cart, addToCart, removeFromCart, checkOut };
}
