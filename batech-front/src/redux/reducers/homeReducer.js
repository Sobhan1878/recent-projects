import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Request from "../../services/request";

const req = new Request();

const initialState = {
    articles: {},
    headArticles: {},
    mostViewArticles: {},
    paginationLoader: false,
    loading: true,
};

export const getArticles = createAsyncThunk("articles", async () => {
    return await req.get("article/");
});

export const getHeadingArticles = createAsyncThunk("headArticles", async () => {
    return await req.get("getHeadingArticles/");
});

export const getMostViewArticles = createAsyncThunk(
    "mostViewArticles",
    async () => {
        return await req.get("getMostViewArticles/");
    }
);

export const getMoreArticles = createAsyncThunk(
    "moreArticles",
    async (page) => {
        return await req.get(`article//?page=${page}`);
    }
);

const homeReducer = createSlice({
    name: "home",
    initialState,
    reducers: {
        offLoading(state) {
            state.loading = false;
        },
        onLoading(state) {
            state.loading = true;
        },
        emptyHomeData(state) {
            state.articles = {};
            state.headArticles = {};
            state.mostViewArticles = {};
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
            })
            .addCase(getHeadingArticles.fulfilled, (state, action) => {
                state.headArticles = action.payload;
            })
            .addCase(getMostViewArticles.fulfilled, (state, action) => {
                state.mostViewArticles = action.payload;
            })
            .addCase(getMoreArticles.pending, (state) => {
                state.paginationLoader = true;
            })
            .addCase(getMoreArticles.fulfilled, (state, action) => {
                action.payload.data.forEach((article) => {
                    state.articles.data.push(article);
                });
                state.paginationLoader = false;
            });
    },
});

export default homeReducer.reducer;
export const { offLoading, onLoading, emptyHomeData } = homeReducer.actions;
