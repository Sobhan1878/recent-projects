import { Swiper, SwiperSlide } from "swiper/react";
import HeadNewsCard from "../../../components/HeadNewsCard";

export default function MostViewsArticles({ data }) {
    return (
        <Swiper slidesPerView={1} spaceBetween={15}>
            {data.map((article) => (
                <SwiperSlide key={article.slug}>
                    <HeadNewsCard article={article} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
