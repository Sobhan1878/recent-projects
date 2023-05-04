import React, { useEffect } from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import "swiper/css";
import "./home.css";
import MainNewsCard from "./components/MainNewsCard";
import HeadNewsCard from "../../components/HeadNewsCard";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../redux/reducers/homeReducer";
import ClientLoading from "./components/ClientLoading";
import { Link } from "react-router-dom";
import SiteHeading from "./components/SiteHeading";

export default function Home() {
    const homeData = useSelector((state) => state.home);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, []);

    return (
        <>
            {homeData.loading ? (
                <ClientLoading />
            ) : (
                <>
                    <SiteHeading />
                    <ClientLayout>
                        <div className="news">
                            <div className="right-side">
                                <div className="most-view-article">
                                    <h3 className="site-title">
                                        پر بازدیدترین مطالب
                                    </h3>
                                    <HeadNewsCard />
                                </div>
                            </div>
                            <div className="main-news">
                                <h3 className="site-title">آخرین اخبار</h3>
                                {homeData.articles.data.map((article) => (
                                    <Link
                                        to={`${article.en_category}/${article.slug}`}
                                        key={article.slug}
                                    >
                                        <MainNewsCard data={article} />
                                    </Link>
                                ))}
                            </div>
                            <div className="left-side">
                                <div className="most-view-article">
                                    <h3 className="site-title">
                                        پر بازدیدترین مطالب
                                    </h3>
                                    <HeadNewsCard />
                                </div>
                            </div>
                        </div>
                    </ClientLayout>
                </>
            )}
        </>
    );
}
