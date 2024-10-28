//Third party imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Static imports
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "theme"], // Add any slices you want to persist
};

// Combine all reducers
const rootReducer = combineReducers({
    theme: themeSlice,
    user: userSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };