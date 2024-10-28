//Third party imports
import { createSlice } from "@reduxjs/toolkit";

//Default state
const initialState={
    userDetails:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            // Set user details when logged in
            state.userDetails = action.payload;
        },
        
        //Removal of user details on logout
        clearUserDetails: (state) => {
            // Reset the entire state to initial values on logout
            state.userDetails = null;
            state.isAuthenticated = false;
        }
    }

})

export const { setUserDetails,clearUserDetails } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;