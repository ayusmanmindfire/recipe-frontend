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
            console.log(action.payload)
            // Set user details when logged in
            state.userDetails = action.payload;
        }
    }

})

export const { setUserDetails } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;