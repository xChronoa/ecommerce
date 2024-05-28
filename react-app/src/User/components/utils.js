import { useState, useEffect } from "react";
import { toast, Slide } from "react-toastify";

// Contains state and effect for the functionalities of cart.
export function useCart() {
    // Store and setter for cart.
    const [cart, setCart] = useState([]);

    // State for displaying a loading page. Used for fetching data first before render.
    const [loading, setLoading] = useState(true);

    // Store and setter for cart total (total price and quantity).
    const [cartTotal, setCartTotal] = useState({ totalPrice: 0, totalQuantity: 0 });

    // Notification in top right using react-toast for successful operation.
    const notify = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    }

    // Sends a GET request to fetch all the items in Cart.
    const fetchCartItems = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/cart");

            if (!response.ok) {
                throw new Error("Failed to fetch cart items");
            }

            const data = await response.json();

            setCart(data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch the total price sum of all products in cart and total product quantity inside it.
    const fetchCartTotal = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/cart/total"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch cart total");
            }

            const cartTotalData = await response.json();

            setCartTotal(cartTotalData);
        } catch (error) {
            console.error("Error fetching cart total:", error);
        }
    };

    // Add to Cart Functionality
    const addToCart = async (product) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/cart/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...product, quantity: 1 }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }

            fetchCartItems(); // Fetch updated cart items after adding

            notify("Successfully added product to cart.");
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    // Remove from Cart
    const removeFromCart = async (productId) => {
        if (window.confirm("Are you sure you want to remove this product from your cart?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/cart/remove/${productId}`,
                    {
                        method: "DELETE",
                    }
                );
                
                if (!response.ok) {
                    throw new Error("Failed to remove item from cart");
                }

                fetchCartItems().then(() => {
                    fetchCartTotal();
                }); // Fetch updated cart items after removing

                notify("Sucessfully removed product from cart.")
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    const checkOut = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const form = event.target;

        form.classList.add("was-validated");

        // Check if input fields are valid and filled.
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Send a request to the API.
            try {
                if (window.confirm("Are you sure you want to checkout?")) {
                    // Alternatively, if you want to remove data from the API
                    const response = await fetch(
                        "http://127.0.0.1:8000/api/cart/checkout",
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to checkout.");
                    }

                    notify("Successful purchase!");

                    // Add a delay before redirecting back to product page.
                    setTimeout(() => {
                        window.location.href = "/product";
                    }, 1000);
                }
            } catch (error) {
                console.error("Error checkout:", error);
            }
        }
    };

    // Fetch cart items on component mount
    useEffect(() => {
        const fetchData = async () => {
            await fetchCartItems();
            fetchCartTotal();
        }

        fetchData();
    }, []);

    return { cart, loading, cartTotal, addToCart, removeFromCart, checkOut, fetchCartItems };
}

export function useProduct() {
    const [products, setProducts] = useState([]);

    const fetchTasks = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        const data = await response.json();

        if (data.status === 200) {
            setProducts(data.data);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { products, setProducts };
}