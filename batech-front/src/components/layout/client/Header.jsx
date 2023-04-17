import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/img/logo.png";
import cover from "../../../assets/img/banners/ban main/ban2.jpg";
import cover1 from "../../../assets/img/banners/ban main/ban3.jpg";
import ScrollReveal from "scrollreveal";

export default function Header() {
    const navbar = useRef();
    const [scrollY, setScrollY] = useState(0);

    document.addEventListener("scroll", () => {
        setScrollY(window.scrollY);
    });

    useEffect(() => {
        if (!scrollY) {
            navbar.current.classList.add("onTop");
        } else {
            navbar.current.classList.remove("onTop");
        }
    }, [scrollY]);

    useEffect(() => {
        ScrollReveal({
            reset: true,
            origin: "top",
            duration: 1500,
            distance: "85px",
            delay: 300,
        }).reveal(".header-news");
    }, []);

    return (
        <>
            <div className="header">
                <div className="header-content">
                    <div className="text-content">
                        <h2>بلاگ باتِک</h2>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="batech logo" />
                    </div>
                </div>
                <div className="header-news">
                    <div className="header-news-item">
                        <div className="cover">
                            <img src={cover} alt="" />
                        </div>
                        <h3 className="title">
                            از M3 خبری نیست؛ مک بوک ایر 15 اینچی احتمالاً با
                            «تراشه هم‌سطح M2» معرفی می‌شود
                        </h3>
                        <div className="info">
                            <div className="author">
                                <span>اسم نویسنده</span>
                            </div>
                            <div className="createdAt">تایم خبر</div>
                            <div className="category">دسته‌بندی خبر</div>
                        </div>
                    </div>
                    <div className="header-news-item">
                        <div className="cover">
                            <img src={cover1} alt="" />
                        </div>
                        <h3 className="title">
                            شیائومی ۱۳ اولترا فقط با یک درصد شارژ، ۶۰ دقیقه کار
                            می‌کند
                        </h3>
                        <div className="info">
                            <div className="author">
                                <span>اسم نویسنده</span>
                            </div>
                            <div className="createdAt">تایم خبر</div>
                            <div className="category">دسته‌بندی خبر</div>
                        </div>
                    </div>
                    <div className="header-news-item">
                        <div className="cover">
                            <img src={cover} alt="" />
                        </div>
                        <h3 className="title">
                            از M3 خبری نیست؛ مک بوک ایر 15 اینچی احتمالاً با
                            «تراشه هم‌سطح M2» معرفی می‌شود
                        </h3>
                        <div className="info">
                            <div className="author">
                                <span>اسم نویسنده</span>
                            </div>
                            <div className="createdAt">تایم خبر</div>
                            <div className="category">دسته‌بندی خبر</div>
                        </div>
                    </div>
                    <div className="header-news-item">
                        <div className="cover">
                            <img src={cover} alt="" />
                        </div>
                        <h3 className="title">
                            از M3 خبری نیست؛ مک بوک ایر 15 اینچی احتمالاً با
                            «تراشه هم‌سطح M2» معرفی می‌شود
                        </h3>
                        <div className="info">
                            <div className="author">
                                <span>اسم نویسنده</span>
                            </div>
                            <div className="createdAt">تایم خبر</div>
                            <div className="category">دسته‌بندی خبر</div>
                        </div>
                    </div>
                    <div className="header-news-item">
                        <div className="cover">
                            <img src={cover} alt="" />
                        </div>
                        <h3 className="title">
                            از M3 خبری نیست؛ مک بوک ایر 15 اینچی احتمالاً با
                            «تراشه هم‌سطح M2» معرفی می‌شود
                        </h3>
                        <div className="info">
                            <div className="author">
                                <span>اسم نویسنده</span>
                            </div>
                            <div className="createdAt">تایم خبر</div>
                            <div className="category">دسته‌بندی خبر</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navigation" ref={navbar}>
                <div className="nav-item">
                    <a href="">خانه</a>
                </div>
                <div className="nav-item">
                    <a href="">دسته‌بندی‌ها</a>
                </div>
                <div className="nav-item">
                    <a href="">مقالات</a>
                </div>
                <div className="nav-item">
                    <a href="">درباره ما</a>
                </div>
                <div className="nav-item">
                    <a href="">تماس با ما</a>
                </div>
                <div className="nav-logo">
                    <img src={logo} alt="batech logo" />
                </div>
            </div>
        </>
    );
}
