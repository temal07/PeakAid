import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    responseData: null,
    savedResponse: null,
    saveInstantly: false,
    isSaved: false,
}

const geminiSlice = createSlice({
    name: 'geminiResponse',
    initialState,
    reducers: {
        setResponseData: (state, action) => {
            state.responseData = action.payload;
        },
        setSavedResponse: (state, action) => {
            state.savedResponse = action.payload;
        },
        setSaveInstantly: (state, action) => {
            state.saveInstantly = action.payload;
        },
        setIsSaved: (state, action) => {
            state.isResponseSaved = action.payload;
        },
    }
});

export const {
    setResponseData, 
    setSavedResponse,
    setSaveInstantly,
    setIsSaved,
} = geminiSlice.actions;

export default geminiSlice.reducer;