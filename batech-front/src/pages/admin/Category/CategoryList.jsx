import { useEffect, useState } from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import "./category.css";
import Request from "../../../services/request";
import AdminLoading from "../components/AdminLoading";

const req = new Request();

export default function CategoryList() {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        if (!Object.values(categories).length) {
            req.get("category/").then((res) => setCategories(res.data));
        }
    }, []);

    return (
        <AdminLayout>
            <h3 className="site-title">لیست دسته‌بندی‌ها</h3>
            {Object.values(categories).length ? (
                <div className="categories">
                    <table>
                        <thead>
                            <tr>
                                <th>عنوان انگلیسی</th>
                                <th>عنوان فارسی</th>
                                <th>نامک</th>
                                <th>ویرایش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(categories).map((category) => {
                                return (
                                    <tr key={category.id}>
                                        <td>{category.en_title}</td>
                                        <td>{category.fa_title}</td>
                                        <td>{category.slug}</td>
                                        <td>
                                            <button type="submit">
                                                ویرایش
                                            </button>
                                        </td>
                                        <td>
                                            <button type="submit">حذف</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <AdminLoading />
            )}
        </AdminLayout>
    );
}
