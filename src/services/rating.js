//Third party imports
import axios from "axios";

//Static imports
import { ratingsApi } from "../utils/apiPaths";

//function for api call that fetch all ratings of a single recipe
export async function getRatingsOfARecipe(token,id){
    try {
        const ratingResponse = await axios.get(`${ratingsApi.getRatings}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return ratingResponse;
    } catch (error) {
        throw error
    }
}

//function for api call that add ratings to a single recipe
export async function addRating(token,values,recipeID){
    try {
        const response = await axios.post(ratingsApi.addRatings + recipeID, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response
    } catch (error) {
        throw error
    }
}