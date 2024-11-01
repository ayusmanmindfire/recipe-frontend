//Third party imports
import axios from "axios"

//Static imports
import { recipesApi } from "../utils/apiPaths"

//function for calling search api for recipes
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

//function for calling api for get all recipes
export async function getAllRecipe(token,page=1,limit){
    try {
        const queryForPage=`?page=${page}&limit=${limit}`
        const response = await axios.get(recipesApi.getAllRecipes+queryForPage, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return response
    } catch (error) {
        throw error
    }
}


//function for calling delete an recipe api
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

//function for calling an api for getting details of an recipe
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

//function for calling an api for adding a new recipe
export async function addRecipe(token,values){
    try {
        const response = await axios.post(recipesApi.addNewRecipe, values, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        throw error        
    }
}

//function for calling an api for editing a recipe
export async function editRecipe(token,values,id){
    try {
        const response = await axios.put(`${recipesApi.updateRecipe}${id}`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        throw error        
    }
}