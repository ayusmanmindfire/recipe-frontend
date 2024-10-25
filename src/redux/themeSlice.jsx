import { createSlice } from "@reduxjs/toolkit";

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