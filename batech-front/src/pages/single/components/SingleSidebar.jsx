import { Swiper, SwiperSlide } from "swiper/react";
import HeadNewsCard from "../../../components/HeadNewsCard";
import { Link } from "react-router-dom";
import SingleLastArticles from "./SingleLastArticles";
import SingleSimilarArticles from "./SingleSimilarArticles";
import SingleMostViewArticles from "./SingleMostViewArticles";

export default function SingleSidebar({
    lastArticles,
    mostViewArticles,
    similarArticles,
}) {
    return (
        <div className="single-sidebar">
            <h3 className="site-title">جدیدترین مطالب</h3>
            <SingleLastArticles lastArticles={lastArticles} />
            <SingleSimilarArticles similarArticles={similarArticles} />
            <SingleMostViewArticles mostViewArticles={mostViewArticles} />
        </div>
    );
}
