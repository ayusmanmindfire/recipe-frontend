import axios from "axios";
import { ratingsApi } from "../utils/apiPaths";

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