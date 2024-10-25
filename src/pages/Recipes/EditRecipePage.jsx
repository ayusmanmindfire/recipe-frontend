import { Navbar } from "../../components/Navbar";
import { RecipeForm } from "../../components/RecipeForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { recipesApi } from "../../utils/apiPaths";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import smokeImage from "../../assets/smoke.jpg";

export const EditRecipePage = () => {
    const [apiError, setApiError] = useState("");
    const [initialValues, setInitialValues] = useState({
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const token = cookies.Authorization;

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                if (!token) {
                    navigate('/login');
                    return
                }
                const response = await axios.get(`${recipesApi.getRecipeDetails}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const recipeData = response.data.data;
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

    const handleSubmit = async (values) => {
        try {
            const response = await axios.put(`${recipesApi.updateRecipe}${id}`, values, {
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

    return (
        <>
            <Navbar />
            <div className="dark:bg-gray-800 dark:text-white">
                <div className="container mx-auto p-8 ">
                    <h2 className="text-2xl font-bold text-center font-Rubik mb-6">Edit Recipe</h2>
                    <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={smokeImage} />
                </div>
            </div>
        </>
    );
};
