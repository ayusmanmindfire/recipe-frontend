import { Navbar } from "../components/Navbar";
import eggCooking from "../assets/eggCooking.jpg";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { recipesApi } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

//formik validation function
const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = "Title is required";
    }
    if (!values.steps) {
        errors.steps = "Steps are required";
    }
    if (!values.image) {
        errors.image = "Image file is required";
    }
    if (values.ingredients.length === 0) {
        errors.ingredients = "At least one ingredient is required";
    }
    return errors;
};

export const RecipeForm = () => {
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate()
    const [cookies] = useCookies(['user']);
    const token = cookies.Authorization //fetching token from the cookies

    const formik = useFormik({
        initialValues: {
            title: "",
            steps: "",
            image: "",
            ingredients: [""], // Array for ingredients
        },
        validate,
        onSubmit: async (values) => {
            try {
                console.log(values)
                const response = await axios.post(recipesApi.addNewRecipe, values, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                        "Content-Type": "multipart/form-data"
                    },
                })
                setApiError("");
                navigate('/recipes')
            } catch (error) {
                if (error.response)
                    setApiError(error.response.data.message || "Something went wrong")
                else
                    navigate('/error')
            }
        },
    });

    // function for adding ingredient field
    const addIngredient = () => {
        formik.setFieldValue("ingredients", [...formik.values.ingredients, ""]);
    };

    //Function for removing ingredient
    const removeIngredient = (index) => {
        const updatedIngredients = formik.values.ingredients.filter(
            (ingredient, i) => i !== index
        );
        formik.setFieldValue("ingredients", updatedIngredients);
    };

    return (
        <>
            <Navbar />
            <div className="section-container grid grid-cols-1 items-center gap-10 md:h-screen md:grid-cols-2 p-10 font-Rubik ">
                {/* Form Container */}
                <div className="form-container w-full bg-white p-8 rounded-lg shadow-2xl border ">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Add new recipe</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div>
                            <input
                                type="text"
                                placeholder="Enter the title"
                                name="title"
                                id="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.title && (
                                <div className="text-red-600 mt-1">{formik.errors.title}</div>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="block mb-2 font-semibold">Ingredients:</label>
                            {formik.values.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder={`Ingredient ${index + 1}`}
                                        name={`ingredients[${index}]`}
                                        value={ingredient}
                                        onChange={formik.handleChange}
                                        className="w-full px-1 border rounded-lg focus:outline-none focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeIngredient(index)}
                                        className="bg-red-500 text-white px-3 rounded-lg text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addIngredient}
                                className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-lg text-sm"
                            >
                                Add ingredient
                            </button>
                            {formik.errors.ingredients && (
                                <div className="text-red-600 mt-1">{formik.errors.ingredients}</div>
                            )}
                        </div>

                        {/* Steps */}
                        <div>
                            <textarea
                                type="text"
                                placeholder="Enter steps"
                                name="steps"
                                id="steps"
                                onChange={formik.handleChange}
                                value={formik.values.steps}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.steps && (
                                <div className="text-red-600 mt-1">{formik.errors.steps}</div>
                            )}
                        </div>

                        {/* Image File Upload */}
                        <div>
                            <input
                                type="file"
                                name="image"
                                // id="image"
                                onChange={(e)=>formik.setFieldValue("image", e.target.files[0])}
                                // value={formik.values.image}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            {formik.errors.image && (
                                <div className="text-red-600 mt-1">{formik.errors.image}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-hoverPrimary text-white py-3 rounded-lg font-semibold"
                        >
                            Add
                        </button>

                        {/* API Error Message */}
                        {apiError && (
                            <div className="text-red-600 mt-4 text-center">
                                {apiError}
                            </div>
                        )}
                    </form>
                </div>

                {/* Image Section */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    <img src={eggCooking} alt="" className="h-[500px]" />
                </div>
            </div>
        </>
    );
};
