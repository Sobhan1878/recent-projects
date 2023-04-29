import { Link } from "react-router-dom";

export default function AdminSidebar({ handleNavbar }) {
    return (
        <div className="admin-sidebar">
            <ul className="admin-side-navbar" onClick={handleNavbar}>
                <li className="head-li">
                    مقالات
                    <ul className="sub-navbar">
                        <li>
                            <Link to="/admin/articles">لیست مقالات</Link>
                        </li>
                        <li>
                            <Link to="/admin/add-article">افزودن مقاله</Link>
                        </li>
                    </ul>
                </li>
                <li className="head-li">
                    دسته‌بندی‌ها
                    <ul className="sub-navbar">
                        <li>
                            <Link to="/admin/categories">
                                لیست دسته‌بندی‌ها
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/add-category">
                                افزودن دسته‌بندی‌
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/subcategories">
                                لیست زیر دسته‌بندی‌ها
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/add-subcategory">
                                افزودن زیر دسته‌بندی‌
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="head-li">
                    کاربران
                    <ul className="sub-navbar">
                        <li>
                            <Link to="/admin/users">لیست کاربران</Link>
                        </li>
                        <li>
                            <Link to="/admin/add-user">افزودن کاربر</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
