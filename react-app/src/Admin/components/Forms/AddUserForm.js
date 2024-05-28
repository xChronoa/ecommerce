import React, { useState } from 'react';

const AddUserForm = (props) => {
    // Stores form data inputted by the user.
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
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
                <label htmlFor="name" className="form-label">Name:</label>
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
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    min="1"
                    step="any"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Create User</button>
            {formError && <p className="text-danger mt-2">Error: {formError}</p>}
        </form>
    );
};

export default AddUserForm;
