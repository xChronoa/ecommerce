import React, { useState } from 'react';

const AddProductForm = (props) => {
    // Stores form data inputted by the user.
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    // Stores form error.
    const [formError, setFormError] = useState(null);

    // Checks for onChange events for the input fields and sets the variables' value.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function that handles form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error before submission
        setFormError(null); 

        try {
            // Check if the operation is successful, if not then don't close the modal.
            if(await props.add(formData)) {
                props.onClose();
            };
        } catch (error) {
            setFormError(error.message || 'An error occurred while adding the product.');
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
            <button type="submit" className="btn btn-primary">Create Product</button>
            {formError && <p className="text-danger mt-2">Error: {formError}</p>}
        </form>
    );
};

export default AddProductForm;
