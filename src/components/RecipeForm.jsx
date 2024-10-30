//React imports
import React from 'react';

//Third party imports
import { useFormik } from "formik";
import { recipeCardStrings, recipeFormStrings } from '../utils/constantStrings';

//Function for validating form values
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

/**
 * RecipeForm component allows users to create or update a recipe, including title, ingredients, steps, and image upload.
 * Utilizes Formik for form state management and validation, enabling dynamic addition/removal of ingredients.
 * Displays API error messages under the whole form while validation error message under respective input fields.
 */
export const RecipeForm = ({ initialValues, onSubmit, apiError, imageSection }) => {
    //All constants
    const formik = useFormik({
        initialValues,
        validate,
        enableReinitialize: true,
        onSubmit,
    });

    //Utility functions
    //Function form adding field for adding ingredient
    const addIngredient = () => {
        formik.setFieldValue("ingredients", [...formik.values.ingredients, ""]);
    };

    //Function form removing field for adding ingredient
    const removeIngredient = (index) => {
        const updatedIngredients = formik.values.ingredients.filter(
            (ingredient, i) => i !== index
        );
        formik.setFieldValue("ingredients", updatedIngredients);
    };

    return (
        <div className="grid grid-cols-1 p-5 gap-5 dark:h-full md:h-screen md:grid-cols-2 font-Rubik bg-white dark:bg-gray-800 transition-colors duration-200">
            <form onSubmit={formik.handleSubmit} className="dark:bg-gray-800 space-y-4">
                {/* Title */}
                <div>
                    <input
                        type="text"
                        placeholder="Enter the title"
                        name="title"
                        id="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary 
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                                 dark:placeholder-gray-400"
                    />
                    {formik.errors.title && (
                        <div className="text-red-600 dark:text-red-400 mt-1">{formik.errors.title}</div>
                    )}
                </div>

                {/* Dynamic Ingredients */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-900 dark:text-white">
                        {recipeCardStrings.ingredientsHeader}
                    </label>
                    {formik.values.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder={`Ingredient ${index + 1}`}
                                name={`ingredients[${index}]`}
                                value={ingredient}
                                onChange={formik.handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary 
                                         dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                                         dark:placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg text-sm
                                         dark:bg-red-600 dark:hover:bg-red-700"
                            >
                                {recipeFormStrings.removeButton}
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg text-sm
                                 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        {recipeFormStrings.addButton}
                    </button>
                    {formik.errors.ingredients && (
                        <div className="text-red-600 dark:text-red-400 mt-1">
                            {formik.errors.ingredients}
                        </div>
                    )}
                </div>

                {/* Steps */}
                <div>
                    <textarea
                        placeholder="Enter steps"
                        name="steps"
                        id="steps"
                        onChange={formik.handleChange}
                        value={formik.values.steps}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                                 dark:placeholder-gray-400"
                    />
                    {formik.errors.steps && (
                        <div className="text-red-600 dark:text-red-400 mt-1">{formik.errors.steps}</div>
                    )}
                </div>

                {/* Image File Upload */}
                <div>
                    <input
                        data-testid="image-upload"
                        type="file"
                        name="image"
                        onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                                 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                                 file:border-0 file:text-sm file:font-semibold
                                 file:bg-primary file:text-white
                                 dark:file:bg-gray-600 dark:file:text-white
                                 hover:file:bg-hoverPrimary"
                    />
                    {formik.errors.image && (
                        <div className="text-red-600 dark:text-red-400 mt-1">{formik.errors.image}</div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center ">
                    <button
                        type="submit"
                        className="w-1/2 bg-primary hover:bg-hoverPrimary text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                        {initialValues.title ? "Update Recipe" : "Add Recipe"}
                    </button>
                </div>

                {/* API Error Message */}
                {apiError && (
                    <div className="text-red-600 dark:text-red-400 mt-4 text-center">{apiError}</div>
                )}
            </form>

            {/* Image Section */}
            <div className="flex w-full justify-center mb-5">
                <img 
                    src={imageSection} 
                    alt="" 
                    className="dark:hidden md:h-[500px] dark:border-gray-600 dark:bg-gray-700"
                />
            </div>
        </div>
    );
};

export default RecipeForm;