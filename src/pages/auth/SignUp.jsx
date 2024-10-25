import { Navbar } from "../../components/Navbar";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userApi } from "../../utils/apiPaths";

const validate = (values) => {
    const errors = {}; //object of errors for specific fields
    if (!values.username) {
        errors.username = "Username cannot be empty";
    } else if (values.username.length > 40 || values.username.length < 3) {
        errors.username = "Must be between 3 to 40 characters";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (!/^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,30}$/.test(values.password)) {
        errors.password = "Password should be 8-30 characters and contain at least one special character";
    }

    return errors;
};

export const SignUp = () => {
    const [apiError, setApiError] = useState(""); // State to store API error messages
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                //POST api call with values as the payload
                const response = await axios.post(userApi.registerUser, values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // console.log("Registration successful:", response.data);
                setApiError("");
                navigate('/login'); //On successful registration navigate to login
            } catch (error) {
                if (error.response) {
                    // API error response
                    setApiError("Email already exists");
                } else {
                    // Network or other errors
                    setApiError("Network error. Please try again later.");
                }
            }
        },
    });

    return (
        <>
            <Navbar />
            <div className="dark:bg-gray-600 section-container grid grid-cols-1 items-center gap-10 md:h-screen md:grid-cols-2 p-10 font-Rubik bg-gray-100">
                
                {/* Form Container */}
                <div className="form-container w-full bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
                    <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">Create an Account</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.username && (
                                <div className="text-red-600 mt-1">{formik.errors.username}</div>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.email && (
                                <div className="text-red-600 mt-1">{formik.errors.email}</div>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.password && (
                                <div className="text-red-600 mt-1">{formik.errors.password}</div>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-hoverPrimary text-white py-3 rounded-lg font-semibold">
                            Register
                        </button>

                        {/* API Error Message */}
                        {apiError && (
                            <div className="text-red-600 mt-4 text-center">
                                {apiError}
                            </div>
                        )}
                    </form>
                </div>

                {/*Login option */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-lg dark:text-white">Already have an delicious account?</p>
                    <button
                        className="bg-primary hover:bg-hoverPrimary text-white py-3 px-6 rounded-lg font-semibold"
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </>
    );
};
