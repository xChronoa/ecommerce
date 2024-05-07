import React from "react";
import { useCart } from "./utils";
import { ToastContainer } from "react-toastify";

// Component for receiving Shipping Details and checking out cart.
const CheckOut = () => {
    const { checkOut } = useCart();

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column mb-5 w-100">
            <ToastContainer />
            
            <div className="py-5 text-center">
                <h2>Check-Out Form</h2>
            </div>

            <div className="row w-100">
                <div className="col-md order-md-1">
                    <h4 className="mb-3">Billing address</h4>
                    <form
                        className="needs-validation"
                        noValidate
                        onSubmit={checkOut}
                    >
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder=""
                                    defaultValue=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder=""
                                    defaultValue=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">
                                Email{" "}
                                <span className="text-muted">(Optional)</span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="you@example.com"
                                defaultValue=""
                            />
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping
                                updates.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="1234 Main St"
                                defaultValue=""
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">
                                Address 2{" "}
                                <span className="text-muted">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address2"
                                placeholder="Apartment or suite"
                                defaultValue=""
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <select
                                    className="form-control d-block w-100"
                                    id="country"
                                    required
                                    defaultValue=""
                                >
                                    <option value="">Choose...</option>
                                    <option>Philippines</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <select
                                    className="form-control d-block w-100"
                                    id="state"
                                    required
                                    defaultValue=""
                                >
                                    <option value="">Choose...</option>
                                    <option>Laguna</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    placeholder=""
                                    required
                                    defaultValue=""
                                />
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="same-address"
                            />
                            <label
                                className="mx-3 form-check-label"
                                htmlFor="same-address"
                            >
                                Shipping address is the same as my billing
                                address
                            </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="save-info"
                            />
                            <label
                                className="mx-3 form-check-label"
                                htmlFor="save-info"
                            >
                                Save this information for next time
                            </label>
                        </div>
                        <hr className="mb-4" />

                        <h4 className="mb-3">Payment</h4>

                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input
                                    id="credit"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                    defaultChecked
                                    required
                                />
                                <label
                                    className="mx-3 form-check-label"
                                    htmlFor="credit"
                                >
                                    Credit card
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input
                                    id="debit"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                    required
                                />
                                <label
                                    className="mx-3 form-check-label"
                                    htmlFor="debit"
                                >
                                    Debit card
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input
                                    id="paypal"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                    required
                                />
                                <label
                                    className="mx-3 form-check-label"
                                    htmlFor="paypal"
                                >
                                    PayPal
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-name">Name on card</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-name"
                                    placeholder=""
                                    required
                                    defaultValue=""
                                />
                                <small className="text-muted">
                                    Full name as displayed on card
                                </small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-number">
                                    Credit card number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-number"
                                    placeholder=""
                                    required
                                    defaultValue=""
                                />
                                <div className="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">
                                    Expiration
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-expiration"
                                    placeholder=""
                                    required
                                    defaultValue=""
                                />
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-cvv">CVV</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-cvv"
                                    placeholder=""
                                    required
                                    defaultValue=""
                                />
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <button
                            className="w-100 btn btn-primary btn-lg btn-block"
                            type="submit"
                        >
                            CHECK OUT
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
