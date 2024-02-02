import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
    } ,
    reducers: {
        setCredentials(state , action ) {
            const { user, loggendIn } = action.payload;
            state.user = user;
            state.loggendIn = loggendIn;
        },
        deleteCredentials(state) {
            state.user = null;
            state.loggendIn = false;
        },
    },
});

export const { setCredentials, deleteCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectLoggedIn = (state) => state.auth.loggendIn;