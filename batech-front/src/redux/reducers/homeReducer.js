import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Request from "../../services/request";

const req = new Request();

const initialState = {
    categories: {},
    subcategories: {},
    articles: {},
    loading: true,
};

export const getArticles = createAsyncThunk("articles", async () => {
    return await req.get("article/");
});

const homeReducer = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.loading = false;
            });
    },
});

export default homeReducer.reducer;
