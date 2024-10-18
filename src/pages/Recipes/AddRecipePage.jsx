import { Navbar } from "../../components/Navbar";
import { RecipeForm } from "../../components/RecipeForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { recipesApi } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import eggCooking from "../../assets/eggCooking.jpg";

export const AddRecipePage = () => {
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const token = cookies.Authorization;

    const initialValues = {
        title: "",
        steps: "",
        image: "",
        ingredients: [""],
    };
    useEffect(()=>{
        if(!token)
            navigate('/login')
    },[])

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

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-5">
                <h2 className="text-2xl font-bold text-center font-Rubik">Add New Recipe</h2>
                <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} apiError={apiError} imageSection={eggCooking} />
            </div>
        </>
    );
};
