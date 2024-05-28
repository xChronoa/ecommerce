import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useProduct } from "../useProduct";
import Loading from "./Loading";

// Contains product information.
import ProductInformation from "./ProductInformation";

// Add & Update Forms
import AddProductForm from "./Forms/AddProductForm";
import UpdateProductForm from "./Forms/UpdateProductForm";

const Product = () => {
    const { loading, products, add, update, remove } = useProduct();
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleAddClose = () => {
        setAddFormVisible(false);
    };

    const handleUpdateClick = (product) => {
        setCurrentProduct(product);
        setUpdateFormVisible(true);
    };

    const handleUpdateClose = () => {
        setUpdateFormVisible(false);
        setCurrentProduct(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md mt-5">
            <ToastContainer />
            <div className="products row m-2 p-2">
                <header className="d-flex justify-content-between mb-3">
                    <h2>Products</h2>
                    <button className="btn btn-primary" onClick={() => setAddFormVisible(true)}>&#10009; Add Product</button>
                </header>
                {products.map((product) => (
                    <ProductInformation
                        key={product.id}
                        product={product}
                        remove={remove}
                        onUpdateClick={handleUpdateClick}
                    />
                ))}
            </div>

            {isAddFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addProductModalLabel">New Product</h1>
                                    <button type="button" className="btn-close" onClick={handleAddClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddProductForm add={add} onClose={handleAddClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isUpdateFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="updateProductModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="updateProductModalLabel">Update Product</h1>
                                    <button type="button" className="btn-close" onClick={handleUpdateClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <UpdateProductForm product={currentProduct} update={update} onClose={handleUpdateClose} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleUpdateClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
