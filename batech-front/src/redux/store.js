import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./reducers/homeReducer";
import singleArticleReducer from "./reducers/singleArticleReducer";

const reducer = {
    home: homeReducer,
    singleArticle: singleArticleReducer,
};

const store = configureStore({
    reducer,
});

export default store;
