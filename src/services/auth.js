//Third party imports
import axios from "axios";

//Static imports
import { userApi } from "../utils/apiPaths";

// Api call for user login
export async function userLogin(values){
    try {
        const response=await axios.post(userApi.loginUser,values,{
            headers:{
                "Content-Type":"Application/json"
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

//Api call for fetching user details by decoding token
export async function verifyToken(token){
    try {
        const userResponse = await axios.get(userApi.verifyTokenUser, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in header
            },
        });
        return userResponse;
    } catch (error) {
        throw error;
    }
}

// Api call registering a new user
export async function registerUser(values){
    try {
        const response = await axios.post(userApi.registerUser, values, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response
    } catch (error) {
        throw error
    }
}

