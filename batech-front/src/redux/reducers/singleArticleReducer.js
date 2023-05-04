import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Request from "../../services/request";

const req = new Request();

const initialState = {
    article: {},
    lastArticles: {},
    similarArticles: {},
    loading: true,
};

export const getArticle = createAsyncThunk("singleArticle", async (slug) => {
    return await req.get(`article/${slug}/`);
});

export const getLastArticles = createAsyncThunk("lastArticles", async () => {
    return await req.get("article/");
});

const singleArticleReducer = createSlice({
    name: "singleArticle",
    initialState,
    reducers: {
        offLoading(state) {
            state.loading = false;
        },
        onLoading(state) {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticle.fulfilled, (state, action) => {
                state.article = action.payload;
            })
            .addCase(getLastArticles.fulfilled, (state, action) => {
                state.lastArticles = action.payload;
            });
    },
});

export default singleArticleReducer.reducer;

export const { offLoading, onLoading } = singleArticleReducer.actions;
