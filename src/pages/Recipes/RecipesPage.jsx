//React imports
import { useState, useEffect } from "react";

//Third party imports
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Static imports
import { RecipeCard } from "../../components/RecipeCard";
import SimpleBackdrop from "../../components/Loader";
import { recipesPageStrings } from "../../utils/constantStrings";
import { getAllRecipe, searchRecipes } from "../../services/recipes";

//Environment variable
const apiUrl=process.env.REACT_APP_API_URL;

/*
 * RecipesPage component for displaying all recipes
 * Fetches recipes from the API, handles search functionality, and displays a grid of RecipeCards
 * Allows users to add new recipes and search for specific recipes
 */
export default function RecipesPage() {
    //All states
    const [recipes, setRecipes] = useState([]); // State to hold the fetched recipes
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle any error

    //All constants
    const [cookies, setCookie] = useCookies(['user']);
    const [query,setQuery]=useState("")
    //Details fetching from redux store
    const userDetails = useSelector((state) => state.user.userDetails);
    const token = cookies.Authorization
    const navigate = useNavigate();

    //Utility functions
    //function for handling search query
    const handleSearch=async()=>{
        try {
            const response=await searchRecipes(query,token);
            setRecipes(response.data.data)
        } catch (error) {
            navigate('/error')
        }
    }
    
    //Use effects
    // Fetch recipes on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if (!token||!userDetails) {
                    navigate('/login');
                    return
                }
                const response = await getAllRecipe(token)
                setRecipes(response.data.data);
            } catch (error) {
                if (error.response && error.response.status === 401)
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
        return <SimpleBackdrop  isLoading={loading}/>
    }

    if (error) {
        navigate('/error')
    }

    return (
        <>
            <div className="recipes-page dark:bg-gray-700 p-4 transition-colors duration-200">
                <div className="flex justify-evenly gap-1  mb-3 h-10">
                    <div className="flex mb-3 h-10 gap-2">
                        <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search" className="px-5 w-full border rounded-lg focus:outline-none focus:border-primary" />
                        <button onClick={handleSearch} className="bg-contrastButton hover:bg-hoverContrastButton hover:text-white rounded-lg px-2 py-1 font-Rubik">{recipesPageStrings.searchButton}</button>
                    </div>
                    <div>
                        <button className="hidden sm:flex bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 font-Rubik" onClick={()=>{
                            navigate('/addRecipe')
                        }}>{recipesPageStrings.addRecipeButton}</button>
                        {/* Responsive button */}
                        <button className="sm:hidden bg-green-500 hover:bg-green-600 text-white rounded-2xl p-2 px-4 font-bold font-Rubik" onClick={()=>{
                            navigate('/addRecipe')
                        }}>{recipesPageStrings.addRecipeResponsive}</button>
                    </div>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                title={recipe.title}
                                ingredients={recipe.ingredients}
                                steps={recipe.steps}
                                // Constructing the full image URL
                                imageUrl={`${apiUrl}/${recipe.image}`}
                                id={recipe._id}
                            />
                        ))
                    ) : (
                        <div>{recipesPageStrings.noRecipes}</div>
                    )}
                </div>
            </div>
        </>
    );
};
