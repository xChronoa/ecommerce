import React from "react";
import ProductInformation from "./ProductInformation";
import { useCart } from "./utils";

// Product Component
// a. Product Pages
const Product = (props) => {

    // Cellphone products
    let products = [
        {id: 1, name: "Apple iPhone 13", description: "Flagship iPhone with powerful performance.", price: 49999.99},
        {id: 2, name: "Samsung Galaxy S21 Ultra", description: "Premium Android phone with a stunning display.", price: 65999.99},
        {id: 3, name: "OnePlus 10 Pro", description: "Smooth performance with OxygenOS.", price: 48999.99},
        {id: 4, name: "Xiaomi Mi 11", description: "Affordable flagship with high-resolution display.", price: 39999.99},
        {id: 5, name: "Google Pixel 6 Pro", description: "Great camera with vibrant display.", price: 55000.99},
        {id: 6, name: "OPPO Find X5 Pro", description: "Sleek design with focus on camera.", price: 59999.99},
        {id: 7, name: "Vivo X70 Pro+", description: "Balanced performance and camera quality.", price: 44999.99},
        {id: 8, name: "Realme GT 2 Pro", description: "Powerful chipset with fast charging.", price: 34999.99},
        {id: 9, name: "Asus ROG Phone 5", description: "Gaming-focused with high-refresh-rate display.", price: 44999.99},
        {id: 10, name: "Nokia X20", description: "Durable with clean Android experience.", price: 19999.99}
    ];

    return (
        <div className="container-md">
            <div className="products row m-2 p-2">
                <h2>Products</h2>
                {products.map(product => (
                    <ProductInformation
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        addToCart={props.addToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Product;