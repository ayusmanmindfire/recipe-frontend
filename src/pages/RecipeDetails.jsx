import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useCookies } from "react-cookie";
import { ratingsApi, recipesApi, userApi } from "../utils/apiPaths";
import axios from "axios";
import { useEffect, useState } from "react";
import deleteImage from "../assets/delete.png";
import editImage from "../assets/edit.png";
import starImage from "../assets/star.png";

const apiUrl = process.env.REACT_APP_API_URL;

export const RecipeDetails = () => {
    const [cookies] = useCookies(['user']);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [ratings, setRatings] = useState(null); // State for rating management
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null); // State for storing user email

    const token = cookies.Authorization;
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch user email using the token
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const userResponse = await axios.get(userApi.verifyTokenUser, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                setUserEmail(userResponse.data.data.email); // Set user email
            } catch (error) {
                navigate('/login');
            }
        };
        verifyUser();
    }, [token, navigate]);

    // Fetch recipe details
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                if (!token) {
                    navigate('/login');
                    return;
                }
                const recipeResponse = await axios.get(`${recipesApi.getRecipeDetails}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });

                const ratingResponse = await axios.get(`${ratingsApi.getRatings}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                });
                setRecipeDetails(recipeResponse.data.data);
                setRatings(ratingResponse.data.data);
            } catch (error) {
                navigate('/error');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [token, id, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to delete recipe
    const handleDelete = async () => {
        try {
            await axios.delete(`${recipesApi.deleteRecipes}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in header
                },
            });
            navigate('/recipes');
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };

    // Function to handle star (rating) button click
    const handleRating = () => {
        navigate(`/rateRecipe/${id}`);
    };
    //function to handle edit recipe
    const handleEdit = () => {
        navigate('/editRecipe/' + id);
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 md:p-8">
                {/* Recipe Details Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-3xl font-bold">{recipeDetails.title}</h1>

                    <div className="flex space-x-2">
                        {/* Star Button */}
                        <button
                            onClick={handleRating}
                            className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                        >
                            <img src={starImage} alt="Rate Recipe" className="w-5" />
                        </button>

                        {userEmail === recipeDetails.createdBy && ( // Conditionally render buttons (which or only enabled for authors of the recipe)
                            <>
                                {/* Edit Button */}
                                <button
                                    onClick={handleEdit}
                                    className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                                >
                                    <img src={editImage} alt="Edit Recipe" className="w-5" />
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full"
                                >
                                    <img src={deleteImage} alt="Delete Recipe" className="w-5" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Recipe Image */}
                <div className="mb-6">
                    <img
                        src={apiUrl + "/" + recipeDetails.image || "https://via.placeholder.com/300"}
                        alt={recipeDetails.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>

                {/* Recipe Steps */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Steps</h2>
                    <p className="text-gray-700 mt-2 wrap">{recipeDetails.steps || "No steps provided."}</p>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        {recipeDetails.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                {/* Ratings */}
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Ratings</h2>
                    {ratings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ratings.map((rating, index) => (
                                <div key={index} className="border p-4 rounded-lg shadow-sm bg-white">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold">{rating.rating}/5</span>
                                        <span className="text-gray-500 text-sm">by {rating.createdBy}</span>
                                    </div>
                                    <p className="text-gray-700 mt-2">{rating.feedback || "No feedback provided."}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No ratings yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};