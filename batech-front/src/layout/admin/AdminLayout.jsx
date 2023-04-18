import "./adminLayout.css";
import logo from "../../assets/img/logo.png";
import admin from "../../assets/img/users/admin/admin.png";
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
    const handleSideNavbar = (e) => {
        if (e.target.tagName !== "LI") {
            return;
        }
        e.target.children[0].classList.toggle("open-subnav");
    };

    return (
        <div className="admin">
            <div className="container">
                <div className="admin-page">
                    <div className="admin-header">
                        <div className="admin-header-content">
                            <div className="logo">
                                <img src={logo} alt="batech" />
                            </div>
                            <div className="user-info">
                                <div className="user-avatar">
                                    <img src={admin} alt="admin" />
                                </div>
                                <div className="user-menu"></div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-sidebar">
                        <ul
                            className="admin-side-navbar"
                            onClick={handleSideNavbar}
                        >
                            <li className="head-li">
                                مقالات
                                <ul className="sub-navbar">
                                    <li>
                                        <a href="">لیست مقالات</a>
                                    </li>
                                    <li>
                                        <Link to="/admin/add-article">
                                            افزودن مقاله
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="head-li">
                                دسته‌بندی‌ها
                                <ul className="sub-navbar">
                                    <li>
                                        <a href="">لیست دسته‌بندی‌ها</a>
                                    </li>
                                    <li>
                                        <Link to="/admin/add-article">
                                            افزودن دسته‌بندی‌
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="head-li">
                                کاربران
                                <ul className="sub-navbar">
                                    <li>
                                        <a href="">لیست کاربران</a>
                                    </li>
                                    <li>
                                        <a href="">افزودن کاربر</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="admin-content">{children}</div>
                </div>
            </div>
        </div>
    );
}
