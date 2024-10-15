import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Navbar } from "../components/Navbar";
import { RecipeCard } from "../components/RecipeCard";
import { recipesApi } from "../utils/apiPaths";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]); // State to hold the fetched recipes
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle any error
    const [cookies,setCookie]=useCookies(['user']);
    const token=cookies.Authorization
    const navigate=useNavigate();

    // Fetch recipes on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if(!token){
                    navigate('/login');
                    return
                }
                const response = await axios.get(recipesApi.getAllRecipes,{
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                setRecipes(response.data.data); 
            } catch (error) {
                if(error.response&&error.response.status===401)
                    navigate('/login')
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Conditional rendering based on loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        navigate('/error')
    }

    return (
        <>
            <Navbar />
            <div className="recipes-page p-4">
                <h1 className="text-2xl font-bold text-center mb-4">Recipe Cards</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                title={recipe.title}
                                ingredients={recipe.ingredients}
                                steps={recipe.steps}
                                // Constructing the full image URL
                                imageUrl={`http://localhost:5000/${recipe.image}`} 
                            />
                        ))
                    ) : (
                        <div>No recipes found</div>
                    )}
                </div>  
            </div>
        </>
    );
};
