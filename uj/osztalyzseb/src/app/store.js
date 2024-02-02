import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/authSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: persistedReducer,
    },
    // Changed the code right here, maybe it works
    // IT DOES YAY
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: {
                    api: apiSlice,
                },
            },
        })
            .concat(apiSlice.middleware),
    devTools: true,
});

export const persistor = persistStore(store);
