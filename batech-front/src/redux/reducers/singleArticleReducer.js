import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Request from "../../services/request";

const req = new Request();

const initialState = {
    article: {},
    lastArticles: {},
    similarArticles: {},
    comments: {},
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

export const getComments = createAsyncThunk("getComments", async (id) => {
    return await req.get(`comment/article_id/${id}/`);
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
        addComment(state, action) {
            let new_comment = action.payload;

            state.comments.data.push({
                id: new_comment.id,
                body: new_comment.comment,
                author: new_comment.name,
                comment_id: new_comment.comment_id,
                type: new_comment.type,
                answers: [],
                create_time: new Date().toLocaleString(),
            });
        },
        emptySingleData(state) {
            state.article = {};
            state.lastArticles = {};
            state.similarArticles = {};
            state.comments = {};
            state.loading = true;
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
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            });
    },
});

export default singleArticleReducer.reducer;

export const {
    offLoading,
    onLoading,
    emptySingleData,
    addComment,
    endComments,
} = singleArticleReducer.actions;
