import axios from "axios"
import { recipesApi } from "../utils/apiPaths"


export async function searchRecipes(query,token){
    try {
        const response=await axios.get(recipesApi.searchRecipes+query,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

export async function getAllRecipe(token){
    try {
        const response = await axios.get(recipesApi.getAllRecipes, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return response
    } catch (error) {
        throw error
    }
}

export async function deleteRecipe(token,id){
    try {
        await axios.delete(`${recipesApi.deleteRecipes}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
    } catch (error) {
        throw error
    }
}

export async function getRecipeDetails(token,id){
    try {
        const recipeResponse = await axios.get(`${recipesApi.getRecipeDetails}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return recipeResponse
    } catch (error) {
        throw error
    }
}