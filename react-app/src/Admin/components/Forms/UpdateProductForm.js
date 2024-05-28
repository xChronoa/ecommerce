import React, { useState } from 'react';

const UpdateProductForm = ({ product, update, onClose }) => {
    const { name, description, price } = product;
    const [formData, setFormData] = useState({ name, description, price });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the operation is successful, if not then don't close the modal.
        if(await update(product.id, formData)) {
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-3 m-auto ">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    min="1"
                    step="any"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
    );
};

export default UpdateProductForm;
