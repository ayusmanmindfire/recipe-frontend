//Third party imports
import { configureStore } from "@reduxjs/toolkit";

//Static imports
import themeSlice from "./themeSlice";

//Configuration for the redux store
const store=configureStore({
    reducer:{
        theme:themeSlice // Setting the theme slice as part of the store's reducer
    }
})

export default store;