import React from "react";
import { useCart, useProduct } from "./utils";
import Loading from "./Loading";
import ProductInformation from "./ProductInformation";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Product Component
// a. Product Pages
const Product = () => {
    const { loading, addToCart } = useCart();
    const { products } = useProduct();

    // For displaying successful output.
    const notify = () =>
        toast.success("Successfully added product to cart.", {
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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md">
            <ToastContainer />
            <div className="products row m-2 p-2">
                <h2>Products</h2>
                {products.map((product) => (
                    <ProductInformation
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        addToCart={addToCart}
                        notify={notify}
                    />
                ))}
            </div>
        </div>
    );
};

export default Product;
