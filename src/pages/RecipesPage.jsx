import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Navbar } from "../components/Navbar";
import { RecipeCard } from "../components/RecipeCard";
import { recipesApi } from "../utils/apiPaths";

export const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]); // State to hold the fetched recipes
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle any error

    // Fetch recipes on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(recipesApi.getAllRecipes);
                setRecipes(response.data.data); 
            } catch (error) {
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
        return <div>Error: {error}</div>;
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
