import React, { useEffect } from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import "swiper/css";
import "./home.css";
import MainNewsCard from "./components/MainNewsCard";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticles,
    getHeadingArticles,
    getMoreArticles,
    getMostViewArticles,
    offLoading,
} from "../../redux/reducers/homeReducer";
import ClientLoading from "../../layout/client/components/ClientLoading";
import { Link } from "react-router-dom";
import SiteHeading from "./components/SiteHeading";
import MostViewsArticles from "./components/MostViewsArticles";
import { emptySingleData } from "../../redux/reducers/singleArticleReducer";
import { ScaleLoader } from "react-spinners";

export default function Home() {
    const {
        articles,
        headArticles,
        mostViewArticles,
        loading,
        paginationLoader,
    } = useSelector((state) => state.home);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, []);

    useEffect(() => {
        dispatch(getHeadingArticles());
    }, []);

    useEffect(() => {
        dispatch(getMostViewArticles());
    }, []);

    useEffect(() => {
        dispatch(emptySingleData());
    }, []);

    useEffect(() => {
        if (
            Object.values(articles).length &&
            Object.values(headArticles).length &&
            Object.values(mostViewArticles).length
        ) {
            dispatch(offLoading());
        }
    }, [articles, headArticles]);

    const handleShowMoreArticles = () => {
        const articleCount = articles.meta.count;
        const currentArticlesCount = articles.data.length;
        if (currentArticlesCount === articleCount) {
            return;
        }
        const page = currentArticlesCount / 10 + 1;

        dispatch(getMoreArticles(page));
    };

    return (
        <>
            {loading ? (
                <ClientLoading />
            ) : (
                <>
                    <SiteHeading data={headArticles.data} />
                    <ClientLayout>
                        <div className="news">
                            <div className="right-side">
                                <div className="most-view-article">
                                    <h3 className="site-title">
                                        پر بازدیدترین مطالب
                                    </h3>
                                    <MostViewsArticles
                                        data={mostViewArticles.data}
                                    />
                                </div>
                            </div>
                            <div className="main-news">
                                <h3 className="site-title">آخرین اخبار</h3>
                                {articles.data.map((article) => (
                                    <Link
                                        to={`${article.en_category}/${article.slug}`}
                                        key={article.slug}
                                    >
                                        <MainNewsCard data={article} />
                                    </Link>
                                ))}
                                <div className="show-more-btn">
                                    {paginationLoader ? (
                                        <ScaleLoader
                                            color={"var(--btn-color)"}
                                            height={20}
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            onClick={handleShowMoreArticles}
                                        >
                                            مطالب بیشتر
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="left-side">
                                <div className="most-view-article">
                                    <h3 className="site-title">
                                        پر بازدیدترین مطالب
                                    </h3>
                                    <MostViewsArticles
                                        data={mostViewArticles.data}
                                    />
                                </div>
                            </div>
                        </div>
                    </ClientLayout>
                </>
            )}
        </>
    );
}
