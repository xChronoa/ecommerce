import React from "react";
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useUser } from "../useUser";
import Loading from "./Loading";

// Contains user information
import UserInformation from "./UserInformation";

// Add & Update Forms
import AddUserForm from "./Forms/AddUserForm";
import UpdateUserForm from "./Forms/UpdateUserForm";

const User = () => {
    const { loading, users, add, update, remove } = useUser();
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleAddClose = () => {
        setAddFormVisible(false);
    };

    const handleUpdateClick = (user) => {
        setCurrentUser(user);
        setUpdateFormVisible(true);
    };

    const handleUpdateClose = () => {
        setUpdateFormVisible(false);
        setCurrentUser(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md mt-5 min-vh-100">
            <ToastContainer />

            {users.length > 0 ? (
                <div className="users row m-2 p-2">
                    <header className="d-flex justify-content-between mb-3">
                        <h2>Users</h2>
                        <button className="btn btn-primary" onClick={() => setAddFormVisible(true)}>&#10009; Add User</button>
                    </header>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <UserInformation
                                        key={user.id}
                                        user={user}
                                        remove={remove}
                                        onUpdateClick={handleUpdateClick}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="users row m-2 p-2">
                    <header className="d-flex justify-content-between mb-3">
                        <h2>Users</h2>
                    </header>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center" colSpan="5">
                                        There are currently no users.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isAddFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addProductModalLabel">New User</h1>
                                    <button type="button" className="btn-close" onClick={handleAddClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddUserForm add={add} onClose={handleAddClose} />
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
                                    <h1 className="modal-title fs-5" id="updateProductModalLabel">Update User</h1>
                                    <button type="button" className="btn-close" onClick={handleUpdateClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <UpdateUserForm user={currentUser} update={update} onClose={handleUpdateClose} />
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

export default User;
