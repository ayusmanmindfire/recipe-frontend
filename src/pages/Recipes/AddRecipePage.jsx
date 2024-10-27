//React imports
import { useEffect, useState } from "react";

//Third party imports
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

//Static imports
import { Navbar } from "../../components/Navbar";
import { RecipeForm } from "../../components/RecipeForm";
import { recipesApi } from "../../utils/apiPaths";
import eggCooking from "../../assets/eggCooking.jpg";

/* 
 * AddRecipePage component for creating a new recipe using RecipeForm component
 * Validates user authorization, provides a form for recipe details, and handles submission to the API
 * On successful submission, redirects to the recipes page
 */
export const AddRecipePage = () => {
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
            const response = await axios.post(recipesApi.addNewRecipe, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setApiError("");
            navigate("/recipes");
        } catch (error) {
            setApiError(error.response?.data?.message || "Something went wrong");
        }
    };

    //Use effects
    //For empty token navigate to login page
    useEffect(()=>{
        if(!token)
            navigate('/login')
    },[])

    return (
        <>
            <Navbar />
            <div className="dark:bg-gray-800 dark:text-white h-full">
            <div className="container mx-auto py-5">
                <h2 className="text-2xl font-bold text-center font-Rubik">Add New Recipe</h2>
                <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={eggCooking} />
            </div>
            </div>
        </>
    );
};
