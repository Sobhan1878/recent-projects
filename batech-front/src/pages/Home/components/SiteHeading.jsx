import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../../../assets/img/logo.png";
import HeadNewsCard from "../../../components/HeadNewsCard";

export default function SiteHeading({ data }) {
    return (
        <div className="heading">
            <div className="container">
                <div className="header-content">
                    <div className="text-content">
                        <h2>بلاگ باتِک</h2>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="batech logo" />
                    </div>
                </div>
                <div className="header-news">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        speed={500}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        {data.map((article) => (
                            <SwiperSlide key={article.slug}>
                                <HeadNewsCard article={article} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
