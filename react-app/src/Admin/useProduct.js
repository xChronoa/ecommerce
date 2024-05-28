import { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';

export function useProduct() {
    // Store and setter for products.
    const [products, setProducts] = useState([]);

    // State for displaying a loading page. Used for fetching data first before render.
    const [loading, setLoading] = useState(true);

    const notify = (message, status) => {
        if(status === "success") {
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
            return true
        } else if (status === "error") {
            toast.error(message, {
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
            return false;
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/");
            const data = await response.json();

            if (response.ok) {
                setProducts(data.data);
            } else {
                throw new Error("Failed to fetch products.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            // Set loading to false after fetching data, regardless of success or failure
            setLoading(false); 
        }
    };

    // Add to Cart Functionality
    const add = async (product) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/products/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product.");
            }

            fetchProducts();
            return notify("Successfully created the product.", "success");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const update = async (productId, updatedProductData) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/products/update/${productId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProductData),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update product in cart.");
            }

            // After successfully updating the product, fetch the updated list of products
            fetchProducts();
            return notify("Successfully updated the product.", "success");
        } catch (error) {
            console.error("Error updating product in cart:", error);
        }
    }

    // Remove from Cart
    const remove = async (productId) => {
        if (window.confirm("Are you sure you want to remove this product?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/products/remove/${productId}`,
                    {
                        method: "DELETE",
                    }
                );
                
                if (!response.ok) {
                    throw new Error("Failed to remove product.");
                }

                fetchProducts();
                return notify("Successfully deleted the product.", "success");
            } catch (error) {
                console.error("Error removing product:", error);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { loading, products, setProducts, add, update, remove};
}