import { useEffect, useRef, useState } from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import CategoriesWrapper from "../../components/CategoriesWrapper";
import Request from "../../services/request";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";

const req = new Request();

export default function Header() {
    const navbar = useRef();
    const [scrollY, setScrollY] = useState(0);
    const [categories, setCategories] = useState({});
    const dispatch = useDispatch();

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

    // useEffect(() => {
    //     if (!Object.values(categories).length) {
    //         req.get("category/").then((res) => setCategories(res.data));
    //     }
    // }, [categories]);

    return (
        <>
            <div className="navigation" ref={navbar}>
                <div className="container">
                    <div className="navigation-right-side">
                        <div className="nav-item categories">
                            <a href="">دسته‌بندی‌ها</a>
                            {/* {categories.length && (
                                <CategoriesWrapper categories={categories} />
                            )} */}
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
                    </div>
                    <div className="navigation-left-side">
                        <div className="nav-logo">
                            <Link to="/">
                                <img src={logo} alt="batech logo" />
                            </Link>
                        </div>
                        <div className="auth-links">
                            {!sessionStorage.getItem("user") ? (
                                <Link to="/auth">
                                    <FaUser />
                                </Link>
                            ) : (
                                <Link to="/dashboard">
                                    <FaUser />
                                    {
                                        JSON.parse(
                                            sessionStorage.getItem("user")
                                        )["name"]
                                    }
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
