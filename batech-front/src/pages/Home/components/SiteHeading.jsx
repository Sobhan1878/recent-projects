import { Swiper, SwiperSlide } from "swiper/react";
import cover from "../../../assets/img/banners/ban main/ban2.jpg";
import cover1 from "../../../assets/img/banners/ban main/ban3.jpg";
import logo from "../../../assets/img/logo.png";

export default function SiteHeading() {
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
                        <SwiperSlide>
                            <div className="header-news-item">
                                <div className="cover">
                                    <img src={cover} alt="" />
                                </div>
                                <h3 className="title">
                                    از M3 خبری نیست؛ مک بوک ایر 15 اینچی
                                    احتمالاً با «تراشه هم‌سطح M2» معرفی می‌شود
                                </h3>
                                <div className="info">
                                    <div className="author">
                                        <span>اسم نویسنده</span>
                                    </div>
                                    <div className="createdAt">تایم خبر</div>
                                    <div className="category">
                                        دسته‌بندی خبر
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="header-news-item">
                                <div className="cover">
                                    <img src={cover} alt="" />
                                </div>
                                <h3 className="title">
                                    از M3 خبری نیست؛ مک بوک ایر 15 اینچی
                                    احتمالاً با «تراشه هم‌سطح M2» معرفی می‌شود
                                </h3>
                                <div className="info">
                                    <div className="author">
                                        <span>اسم نویسنده</span>
                                    </div>
                                    <div className="createdAt">تایم خبر</div>
                                    <div className="category">
                                        دسته‌بندی خبر
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="header-news-item">
                                <div className="cover">
                                    <img src={cover} alt="" />
                                </div>
                                <h3 className="title">
                                    از M3 خبری نیست؛ مک بوک ایر 15 اینچی
                                    احتمالاً با «تراشه هم‌سطح M2» معرفی می‌شود
                                </h3>
                                <div className="info">
                                    <div className="author">
                                        <span>اسم نویسنده</span>
                                    </div>
                                    <div className="createdAt">تایم خبر</div>
                                    <div className="category">
                                        دسته‌بندی خبر
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="header-news-item">
                                <div className="cover">
                                    <img src={cover1} alt="" />
                                </div>
                                <h3 className="title">
                                    شیائومی ۱۳ اولترا فقط با یک درصد شارژ، ۶۰
                                    دقیقه کار می‌کند
                                </h3>
                                <div className="info">
                                    <div className="author">
                                        <span>اسم نویسنده</span>
                                    </div>
                                    <div className="createdAt">تایم خبر</div>
                                    <div className="category">
                                        دسته‌بندی خبر
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="header-news-item">
                                <div className="cover">
                                    <img src={cover1} alt="" />
                                </div>
                                <h3 className="title">
                                    شیائومی ۱۳ اولترا فقط با یک درصد شارژ، ۶۰
                                    دقیقه کار می‌کند
                                </h3>
                                <div className="info">
                                    <div className="author">
                                        <span>اسم نویسنده</span>
                                    </div>
                                    <div className="createdAt">تایم خبر</div>
                                    <div className="category">
                                        دسته‌بندی خبر
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="header-news-item">
                                <div className="cover">
                                    <img src={cover1} alt="" />
                                </div>
                                <h3 className="title">
                                    شیائومی ۱۳ اولترا فقط با یک درصد شارژ، ۶۰
                                    دقیقه کار می‌کند
                                </h3>
                                <div className="info">
                                    <div className="author">
                                        <span>اسم نویسنده</span>
                                    </div>
                                    <div className="createdAt">تایم خبر</div>
                                    <div className="category">
                                        دسته‌بندی خبر
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
