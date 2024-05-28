import React from "react";

const ProductInformation = ({ product, remove, onUpdateClick }) => {
    return (
        <div className="product-container col-md-4 mb-2">
            <div
                key={product.id}
                className="product-content border border-1 p-4 rounded position-relative h-100"
            >
                <div className="product-info mb-5">
                    <h4>{product.name} </h4>
                    <p>Description: {product.description} </p>
                    <p>
                        Price:{" "}
                        {product.price.toLocaleString("en-PH", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                        })}{" "}
                    </p>
                </div>

                <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
                    <button
                        onClick={() => onUpdateClick({
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price
                        })}
                        className="btn btn-primary"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => remove(product.id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInformation;
