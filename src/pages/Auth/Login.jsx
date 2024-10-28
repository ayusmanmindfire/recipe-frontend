//React imports
import { useState } from "react";

//Third party imports
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

//Static imports
import { userApi } from "../../utils/apiPaths";
import { setUserDetails } from "../../redux/userSlice";
import { loginStrings } from "../../utils/constantStrings";

//formik validation function
const validate=(values)=>{
    const errors={}
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
}

/** Login component for handling user authentication
* Renders a form for users to enter their email and password
* Manages form submission, API interaction, and navigation on successful login*/
export default function Login(){
    //All states
    const [apiError,setApiError]=useState("");

    //All constants
    const [cookies, setCookie] = useCookies(['user']);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    // Interaction with form using formik
    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate,
        onSubmit:async(values)=>{
            try {
                const response=await axios.post(userApi.loginUser,values,{
                    headers:{
                        "Content-Type":"Application/json"
                    }
                })
                const token=response.data.data;
                setCookie("Authorization",token)
                setApiError("");

                //Storing user details to the redux                
                const userResponse = await axios.get(userApi.verifyTokenUser, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                dispatch(setUserDetails(userResponse.data.data));
                
                //Navigate to the all recipes page
                navigate('/recipes');
            } catch (error) {
                if(error.response)
                    setApiError(error.response.data.message||"Something went wrong")
                else
                    setApiError("Network error")
            }
        }
    })
    
    return(
        <>
            <div className="dark:bg-gray-600 section-container grid grid-cols-1 items-center gap-10 md:h-screen md:grid-cols-2 p-10 font-Rubik bg-gray-100 ">
                 {/*Signup option */}
                 <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-lg dark:text-white">{loginStrings.noAccount}</p>
                    <button
                        className="bg-primary hover:bg-hoverPrimary text-white py-3 px-6 rounded-lg font-semibold"
                        onClick={() => navigate('/signup')}
                    >
                        {loginStrings.signUpButton}
                    </button>
                </div>
                {/* Form Container */}
                <div className="form-container w-full bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
                    <h2 className=" dark:text-white text-2xl font-semibold mb-6 text-center">{loginStrings.LoginHeader}</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        
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
                            {loginStrings.LoginButton}
                        </button>

                        {/* API Error Message */}
                        {apiError && (
                            <div className="text-red-600 mt-4 text-center">
                                {apiError}
                            </div>
                        )}
                    </form>
                </div>

            </div>
        </>
    )
}