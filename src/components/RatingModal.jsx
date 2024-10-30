//React imports
import React, { useEffect, useState } from 'react';

//Third party imports
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

//Static imports
import { ratingStrings } from '../utils/constantStrings';
import { addRating } from '../services/rating';

// Form validation
const validate = (values) => {
    const errors = {};

    if (!values.rating) {
        errors.rating = "Rating is required";
    } else if (values.rating > 5 || values.rating < 1) {
        errors.rating = "Rating should be in the range of 1-5";
    }

    if (!values.feedback) {
        errors.feedback = "Feedback is required";
    }

    return errors;
};

/**
 * RatingModal component provides a form for users to submit a rating (1-5) and feedback for a recipe.
 * It validates inputs and submits them to the backend, redirecting unauthenticated users to login.
 * Props: recipeID (string), handleClose (function to close the modal).
 */
export const RatingModal = ({ recipeID, handleClose }) => {
    //All states
    const [apiError, setApiError] = useState("");

    //All constants
    const [cookies] = useCookies(["user"]);
    const token = cookies.Authorization;
    const navigate = useNavigate();
    // Initialize Formik with initial values, validation, and submission logic for handling rating submission
    const formik = useFormik({
        initialValues: {
            rating: null,
            feedback: ""
        },
        validate,
        onSubmit: async (values) => {
            try {
                const response = await addRating(token,values,recipeID)
                handleClose();

            } catch (error) {
                if (error.response)
                    setApiError(error.response.data.message);
                else
                    navigate('/error')
            }

        }
    });

    //Use effects
    //For empty token navigate to login page
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    })

    return (
        <div className="dark:bg-gray-700 dark:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded shadow-lg w-[80%] md:w-[40%]">
            <h2 className="text-lg font-bold mb-4">{ratingStrings.ratingHeader}</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">{ratingStrings.ratingField}</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-400"
                    />
                    {/* Error handling */}
                    {formik.errors.rating && (
                        <div className="text-red-600 mt-1">{formik.errors.rating}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">{ratingStrings.feedback}</label>
                    <textarea
                        name="feedback"
                        value={formik.values.feedback}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-400 dark:placeholder-white"
                        rows="4"
                        placeholder="Leave your feedback here"
                    />
                    {/* Error handling */}
                    {formik.errors.feedback && (
                        <div className="text-red-600">{formik.errors.feedback}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 "
                >
                    {ratingStrings.submitButton}
                </button>

                <button
                    onClick={handleClose}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mx-5"
                >
                    {ratingStrings.cancelButton}
                </button>

                {/* API Error Message */}
                {apiError && (
                    <div className="text-red-600 mt-4 text-center">{apiError}</div>
                )}
            </form>
        </div>
    );
};
