import { createSlice } from "@reduxjs/toolkit";

// the following object is a global state that will
// be accessible for the entire application
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading= false;
            state.error = action.payload;
        },
        signOutSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        },
        // Update the number of blogs the user has

        updateAmountOfBlog: (state, action) => {
            if (state.currentUser) {
                state.currentUser.amountOfBlog = action.payload;
            }
        }
    },
});

export const { 
    signInFailure, 
    signInStart, 
    signInSuccess, 
    signOutSuccess, 
    updateAmountOfBlog,
} = userSlice.actions;

export default userSlice.reducer;