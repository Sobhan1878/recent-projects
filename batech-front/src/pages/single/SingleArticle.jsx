import React, { useEffect, useMemo, useState } from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import { useParams } from "react-router-dom";
import ClientLoading from "../../layout/client/components/ClientLoading";
import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import {
    emptySingleData,
    getArticle,
    getComments,
    getLastArticles,
    getSimilarArticles,
    offLoading,
} from "../../redux/reducers/singleArticleReducer";
import { useLayoutEffect } from "react";
import { getMostViewArticles } from "../../redux/reducers/homeReducer";
import SingleSidebar from "./components/SingleSidebar";
import SingleComments from "./components/SingleComments";
import SingleArticleContent from "./components/SingleArticleContent";

export default function SingleArticle() {
    const params = useParams();
    const dispatch = useDispatch();
    const { article, loading, lastArticles, similarArticles, comments } =
        useSelector((state) => state.singleArticle);
    const { mostViewArticles } = useSelector((state) => state.home);

    useEffect(() => {
        if (
            Object.values(lastArticles).length &&
            Object.values(article).length &&
            Object.values(mostViewArticles).length &&
            Object.values(similarArticles).length &&
            Object.values(comments).length
        ) {
            dispatch(offLoading());
        }
    }, [article, lastArticles, mostViewArticles, similarArticles, comments]);

    useLayoutEffect(() => {
        dispatch(getArticle(params.slug));

        return () => dispatch(emptySingleData());
    }, [params]);

    useEffect(() => {
        if (!Object.values(lastArticles).length) {
            dispatch(getLastArticles());
        }
    }, [lastArticles]);

    useEffect(() => {
        if (!Object.values(similarArticles).length) {
            dispatch(getSimilarArticles(params.slug));
        }
    }, [similarArticles]);

    useEffect(() => {
        if (!Object.values(mostViewArticles).length) {
            dispatch(getMostViewArticles());
        }
    }, [mostViewArticles]);

    useEffect(() => {
        if (!Object.values(comments).length && Object.values(article).length) {
            dispatch(getComments(article.data.id));
        }
    }, [comments, article]);

    const endComments = useMemo(() => {
        const group = {};
        if (!comments.data?.length) {
            return {};
        }
        comments.data.forEach((comment) => {
            group[comment.comment_id] ||= [];
            group[comment.comment_id].push(comment);
        });
        return group;
    }, [comments]);

    console.log(endComments);

    return loading ? (
        <ClientLoading />
    ) : (
        <ClientLayout>
            <div className="single-article">
                <SingleSidebar
                    lastArticles={lastArticles}
                    mostViewArticles={mostViewArticles}
                    similarArticles={similarArticles}
                />
                <div className="single-content">
                    <SingleArticleContent article={article} />
                    <SingleComments
                        comments={
                            Object.values(endComments).length
                                ? endComments[null]
                                : []
                        }
                        article={article}
                    />
                </div>
            </div>
        </ClientLayout>
    );
}
