import React, { useEffect, useState } from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import { Link, Navigate, useParams } from "react-router-dom";
import Request from "../../services/request";
import ClientLoading from "../Home/components/ClientLoading";
import moment from "jalali-moment";
import parse from "html-react-parser";
import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticle,
    getLastArticles,
    offLoading,
    onLoading,
} from "../../redux/reducers/singleArticleReducer";
import { useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SingleArticle() {
    const params = useParams();
    const dispatch = useDispatch();
    const { article, loading, lastArticles } = useSelector(
        (state) => state.singleArticle
    );

    useEffect(() => {
        if (
            Object.values(lastArticles).length &&
            Object.values(article).length
        ) {
            dispatch(offLoading());
        }
    }, [article, lastArticles]);

    useLayoutEffect(() => {
        dispatch(getArticle(params.slug));

        return () => dispatch(onLoading());
    }, [params]);

    useEffect(() => {
        if (!Object.values(lastArticles).length) {
            dispatch(getLastArticles());
        }
    }, [lastArticles]);

    return loading ? (
        <ClientLoading />
    ) : (
        <ClientLayout>
            <div className="single-article">
                <div className="single-sidebar">
                    <h3 className="site-title">جدیدترین مطالب</h3>
                    <div className="single-last-articles">
                        {lastArticles.data.map((lastArticle) => {
                            return (
                                <Link
                                    to={`/${lastArticle.en_category}/${lastArticle.slug}`}
                                    key={lastArticle.slug}
                                >
                                    <div className="last-article-item">
                                        <p>{lastArticle.title}</p>
                                        <img
                                            src={`http://localhost:8000/storage/covers/${lastArticle.thumbnail}`}
                                            alt={`http://localhost:8000/storage/covers/${lastArticle.thumbnail}`}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="single-similar-articles">
                        <h3 className="site-title">مطالب مشابه</h3>
                        <Swiper>
                            <SwiperSlide>
                                <div className="similar-article-item">
                                    <img src="" alt="" />
                                    <p></p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="single-most-viewd-articles">
                        <h3 className="site-title">پربازدیدترین مطالب</h3>
                        <div className="single-last-articles">
                            {lastArticles.data.map((lastArticle) => {
                                return (
                                    <Link
                                        to={`/${lastArticle.en_category}/${lastArticle.slug}`}
                                        key={lastArticle.slug}
                                    >
                                        <div className="last-article-item">
                                            <p>{lastArticle.title}</p>
                                            <img
                                                src={`http://localhost:8000/storage/covers/${lastArticle.thumbnail}`}
                                                alt={`http://localhost:8000/storage/covers/${lastArticle.thumbnail}`}
                                            />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="single-content">
                    <div className="single-article-title">
                        <h2>{article.data.title}</h2>
                    </div>
                    <div className="single-article-info">
                        <div className="single-category-time">
                            <span>{article.data.fa_category}</span>
                            <span>{article.data.subcategory}</span>
                            <span>
                                {moment(article.data.create_time)
                                    .locale("fa")
                                    .format("dddd D MMMM y")}
                            </span>
                        </div>
                        <div className="single-author">
                            <span>سبحان کاظمی</span>
                        </div>
                    </div>
                    <div className="single-article-cover">
                        <img
                            src={`http://localhost:8000/storage/covers/${article.data.thumbnail}`}
                            alt={`http://localhost:8000/storage/covers/${article.data.thumbnail}`}
                        />
                    </div>
                    <div className="single-article-content">
                        {parse(article.data.content)}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
