//Third party imports
import { createSlice } from "@reduxjs/toolkit";

//Default state
const initialState={
    theme:"light"
}

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleTheme: (state) => {
            // Toggle theme between light and dark
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    }

})

export const { toggleTheme } = themeSlice.actions;

// Export the reducer
export default themeSlice.reducer;