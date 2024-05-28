import React from "react";
import { useCart, useProduct } from "./utils";
import Loading from "./Loading";
import ProductInformation from "./ProductInformation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Product Component
// a. Product Pages
const Product = () => {
    const { loading, addToCart } = useCart();
    const { products } = useProduct();

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
                    />
                ))}
            </div>
        </div>
    );
};

export default Product;
