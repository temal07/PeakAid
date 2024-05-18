import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    GeminiResponse: null,
    savedResponse: null,
    saveInstantly: false,
    isSaved: false,
}

const geminiSlice = createSlice({
    name: 'geminiResponse',
    initialState,
    reducers: {
        setGeminiResponse: (state, action) => {
            state.GeminiResponse = action.payload;
        },
        setSavedResponse: (state, action) => {
            state.savedResponse = action.payload;
        },
        setSaveInstantly: (state, action) => {
            state.saveInstantly = action.payload;
        },
        setIsSaved: (state, action) => {
            state.isSaved = action.payload;
        },
    }
});

export const {
    setGeminiResponse, 
    setSavedResponse,
    setSaveInstantly,
    setIsSaved,
} = geminiSlice.actions;

export default geminiSlice.reducer;