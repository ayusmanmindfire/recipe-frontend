import { useFormik } from "formik";

// form validation
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

export const RecipeForm = ({ initialValues, onSubmit, apiError, imageSection }) => {
    const formik = useFormik({
        initialValues,
        validate,
        enableReinitialize: true,
        onSubmit,
    });

    // function for adding ingredient field
    const addIngredient = () => {
        formik.setFieldValue("ingredients", [...formik.values.ingredients, ""]);
    };

    // Function for removing an ingredient
    const removeIngredient = (index) => {
        const updatedIngredients = formik.values.ingredients.filter(
            (ingredient, i) => i !== index
        );
        formik.setFieldValue("ingredients", updatedIngredients);
    };

    return (
        <>
            <div className="grid grid-cols-1 p-5 gap-5 md:h-screen md:grid-cols-2 p-2 font-Rubik">
                
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
                            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                        />
                        {formik.errors.image && (
                            <div className="text-red-600 mt-1">{formik.errors.image}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 bg-primary hover:bg-hoverPrimary text-white py-3 rounded-lg font-semibold"
                        >
                            {initialValues.title ? "Update Recipe" : "Add Recipe"}
                        </button>
                    </div>

                    {/* API Error Message */}
                    {apiError && (
                        <div className="text-red-600 mt-4 text-center">{apiError}</div>
                    )}
                </form>
                

                {/* Image Section */}
                <div className="flex w-full justify-center mb-5">
                    <img src={imageSection} alt="" className="md:h-[500px]" />
                </div>
            </div>

        </>
    );
};
