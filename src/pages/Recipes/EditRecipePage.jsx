//React imports
import { useEffect, useState } from "react";

//Third party imports
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

//Static imports
import { RecipeForm } from "../../components/RecipeForm";
import { imagePaths } from "../../utils/imageImports";
import { editRecipeStrings } from "../../utils/constantStrings";
import { editRecipe, getRecipeDetails } from "../../services/recipes";
import { navRoutes } from "../../utils/navigationRoutes";

/*
 * EditRecipePage component for editing an existing recipe using recipeForm component
 * Retrieves recipe details based on recipe ID, pre-populates form with existing data, and handles updates to the API
 * On successful edit, redirects to the recipes page
 */
export default function EditRecipePage() {
    //All states
    const [apiError, setApiError] = useState("");
    const [initialValues, setInitialValues] = useState({
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    });

    //All constants
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const token = cookies.Authorization;

    //Utility functions
    //Function to handle submission of form
    const handleSubmit = async (values) => {
        try {
            const response = await editRecipe(token,values,id)
            setApiError("");
            navigate(navRoutes.recipes);
        } catch (error) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    //Use effects
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                //For empty token redirect to login page
                if (!token) {
                    navigate(navRoutes.login);
                    return
                }
                const response = await getRecipeDetails(token,id)
                const recipeData = response.data.data;
                //Re-populate input fields
                setInitialValues({
                    title: recipeData.title,
                    steps: recipeData.steps,
                    image: recipeData.image,
                    ingredients: recipeData.ingredients,
                });
            } catch (error) {
                setApiError("Error fetching recipe details");
            }
        };

        fetchRecipeDetails();
    }, [id, token]);

    return (
        <>
            <div className="dark:bg-gray-800 dark:text-white">
                <div className="container mx-auto p-8 ">
                    <h2 className="text-2xl font-bold text-center font-Rubik mb-6">{editRecipeStrings.editRecipe}</h2>
                    <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={imagePaths.smoke} />
                </div>
            </div>
        </>
    );
};
