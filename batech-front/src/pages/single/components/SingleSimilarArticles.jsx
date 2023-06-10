import { Swiper, SwiperSlide } from "swiper/react";
import HeadNewsCard from "../../../components/HeadNewsCard";

export default function SingleSimilarArticles({ similarArticles }) {
    return (
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
    );
}
