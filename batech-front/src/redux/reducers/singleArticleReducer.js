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

export const getSimilarArticles = createAsyncThunk(
    "similarArticles",
    async (slug) => {
        return await req.get(`getSimilarArticles/${slug}/`);
    }
);

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
        emptySingleData(state) {
            state.article = {};
            state.lastArticles = {};
            state.similarArticles = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticle.fulfilled, (state, action) => {
                state.article = action.payload;
            })
            .addCase(getLastArticles.fulfilled, (state, action) => {
                let result = [];
                action.payload.data.forEach((article) => {
                    if (result.length < 5) {
                        result.push(article);
                    }
                });
                state.lastArticles = result;
            })
            .addCase(getSimilarArticles.fulfilled, (state, action) => {
                state.similarArticles = action.payload;
            });
    },
});

export default singleArticleReducer.reducer;

export const { offLoading, onLoading, emptySingleData } =
    singleArticleReducer.actions;
