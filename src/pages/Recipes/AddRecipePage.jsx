//React imports
import { useEffect, useState } from "react";

//Third party imports
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

//Static imports
import { RecipeForm } from "../../components/RecipeForm";
import { imagePaths } from "../../utils/imageImports";
import { addRecipeStrings } from "../../utils/constantStrings";
import { addRecipe } from "../../services/recipes";
import { navRoutes } from "../../utils/navigationRoutes";

/* 
 * AddRecipePage component for creating a new recipe using RecipeForm component
 * Validates user authorization, provides a form for recipe details, and handles submission to the API
 * On successful submission, redirects to the recipes page
 */
export default function AddRecipePage(){
    //All states
    const [apiError, setApiError] = useState("");

    //All constants
    const navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const token = cookies.Authorization;
    const initialValues = {
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    };

    //Utility functions
    //Function for handling form submission
    const handleSubmit = async (values) => {
        try {
            const response = await addRecipe(token,values)
            setApiError("");
            navigate(navRoutes.recipes);
        } catch (error) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    //Use effects
    //For empty token navigate to login page
    useEffect(()=>{
        if(!token)
            navigate(navRoutes.login)
    },[])

    return (
        <>
            <div className="min-h-screen dark:bg-gray-800 dark:text-white h-full">
            <div className="container mx-auto py-5">
                <h2 className="text-2xl font-bold text-center font-Rubik">{addRecipeStrings.addRecipe}</h2>
                <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={imagePaths.eggCooking} />
            </div>
            </div>
        </>
    );
};
