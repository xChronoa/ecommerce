import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserForm = ({ user, update, onClose }) => {
    // Destructure the user variable.
    const { name, email, password } = user;

    // Sets the input field's value to the selected user's details.
    const [formData, setFormData] = useState({ name, email, password });

    // For storing the repeat password input's value to check for password confirmation in form submission.
    const [repeatPassword, setRepeatPassword] = useState("");

    // Handles the revealing of password to the user.
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handles the text changes of repeat password input.
    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    // Function for revealing the password to the user.
    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    // Handles form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== repeatPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Check if the operation is successful, if not then don't close the modal.
        if(await update(user.id, formData)) {
            onClose(); // Close the modal after update
        };
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-3 m-auto">
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="repeat-pass" className="form-label">Repeat Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="repeat-pass"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    id="show-password"
                    className="form-check-input"
                    checked={showPassword}
                    onChange={handleShowPasswordChange}
                />
                <label htmlFor="show-password" className="form-check-label">Show Password</label>
            </div>
            <button type="submit" className="btn btn-primary">Update User</button>
        </form>
    );
};

export default UpdateUserForm;
