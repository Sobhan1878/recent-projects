import React, { useEffect, useState } from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import { Link, Navigate, useParams } from "react-router-dom";
import ClientLoading from "../../layout/client/components/ClientLoading";
import moment from "jalali-moment";
import parse from "html-react-parser";
import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticle,
    getLastArticles,
    getSimilarArticles,
    offLoading,
    onLoading,
} from "../../redux/reducers/singleArticleReducer";
import { useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getMostViewArticles } from "../../redux/reducers/homeReducer";
import HeadNewsCard from "../../components/HeadNewsCard";

export default function SingleArticle() {
    const params = useParams();
    const dispatch = useDispatch();
    const { article, loading, lastArticles, similarArticles } = useSelector(
        (state) => state.singleArticle
    );
    const { mostViewArticles } = useSelector((state) => state.home);

    useEffect(() => {
        if (
            Object.values(lastArticles).length &&
            Object.values(article).length &&
            Object.values(mostViewArticles).length &&
            Object.values(similarArticles).length
        ) {
            dispatch(offLoading());
        }
    }, [article, lastArticles, mostViewArticles]);

    useLayoutEffect(() => {
        dispatch(getArticle(params.slug));

        return () => dispatch(onLoading());
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

    return loading ? (
        <ClientLoading />
    ) : (
        <ClientLayout>
            <div className="single-article">
                <div className="single-sidebar">
                    <h3 className="site-title">جدیدترین مطالب</h3>
                    <div className="single-last-articles">
                        {lastArticles.map((lastArticle) => {
                            return (
                                <Link
                                    to={`/${lastArticle.en_category}/${lastArticle.slug}`}
                                    key={lastArticle.slug}
                                >
                                    <div className="last-article-item">
                                        <p>{lastArticle.title}</p>
                                        <img
                                            src={`${lastArticle.thumbnail}`}
                                            alt={`${lastArticle.thumbnail}`}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="single-similar-articles">
                        <h3 className="site-title">مطالب مشابه</h3>
                        <Swiper slidesPerView={1} spaceBetween={30}>
                            {similarArticles.data.map((article) => (
                                <SwiperSlide key={article.slug}>
                                    <HeadNewsCard article={article} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="single-most-viewd-articles">
                        <h3 className="site-title">پربازدیدترین مطالب</h3>
                        <div className="single-last-articles">
                            {mostViewArticles.data.map((mostViewArticle) => {
                                return (
                                    <Link
                                        to={`/${mostViewArticle.en_category}/${mostViewArticle.slug}`}
                                        key={mostViewArticle.slug}
                                    >
                                        <div className="last-article-item">
                                            <p>{mostViewArticle.title}</p>
                                            <img
                                                src={`${mostViewArticle.thumbnail}`}
                                                alt={`${mostViewArticle.thumbnail}`}
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
                            src={`${article.data.thumbnail}`}
                            alt={`${article.data.thumbnail}`}
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
