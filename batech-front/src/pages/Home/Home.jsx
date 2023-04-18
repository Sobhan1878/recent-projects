import React from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./home.css";
import MainNewsCard from "./components/MainNewsCard";
import HeadNewsCard from "../../components/HeadNewsCard";

export default function Home() {
    return (
        <ClientLayout>
            <div className="news">
                <div className="right-side">
                    <div className="most-view-article">
                        <h3 className="site-title">پر بازدیدترین مطالب</h3>
                        <HeadNewsCard />
                    </div>
                </div>
                <div className="main-news">
                    <h3 className="site-title">آخرین اخبار</h3>
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                    <MainNewsCard />
                </div>
                <div className="left-side">
                    <div className="most-view-article">
                        <h3 className="site-title">پر بازدیدترین مطالب</h3>
                        <HeadNewsCard />
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
