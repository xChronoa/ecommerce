import React from "react";

// ProductInformation Component
// b. Product Information Display
const ProductInformation = (props) => {
    return (
        <div className="product-container col-md-3 mb-2">
            <div
                key={props.id}
                className="product-content border border-1 p-4 rounded position-relative h-100"
            >
                <div className="product-info mb-5">
                    <h4>{props.name} </h4>
                    <p>Description: {props.description} </p>
                    <p>
                        Price:{" "}
                        {props.price.toLocaleString("en-PH", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                        })}{" "}
                    </p>
                </div>

                {/* Button to item to cart */}
                <button
                    onClick={() =>
                        props.addToCart({
                            id: props.id,
                            name: props.name,
                            description: props.description,
                            price: props.price,
                        })
                    }
                    className="btn btn-primary position-absolute bottom-0 end-0 m-3"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductInformation;