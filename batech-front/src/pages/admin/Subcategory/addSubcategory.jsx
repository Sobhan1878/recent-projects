import AdminLayout from "../../../layout/admin/AdminLayout";
import { useEffect, useState } from "react";
import Request from "../../../services/request";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { addSubcategoryValidation } from "../../../services/formValidationSchema";
import AdminLoading from "../components/AdminLoading";

const req = new Request();

export default function AddSubcategory() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        if (!Object.values(categories).length) {
            req.get("category/").then((res) => setCategories(res.data));
        }
    }, [categories]);

    const { handleSubmit, handleChange, values, errors, resetForm } = useFormik(
        {
            initialValues: {
                category_id: "",
                en_title: "",
                fa_title: "",
                slug: "",
            },
            validationSchema: addSubcategoryValidation,
            onSubmit: async (values) => {
                setLoading(true);
                const result = await req.post("subcategory/", values);
                if (result.message) {
                    setLoading(false);
                }
                toast.success(
                    result.message === "created" ? "با موفقیت ایجاد شد." : null,
                    {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        toastId: "customToast",
                    }
                );
                resetForm();
            },
        }
    );

    return (
        <AdminLayout>
            <h3 className="site-title">افزودن زیر دسته‌بندی جدید</h3>
            <div className="admin-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="category_id">دسته‌بندی والد</label>
                        <select
                            name="category_id"
                            id="category_id"
                            onChange={handleChange}
                            value={values.category_id}
                        >
                            <option value=""></option>
                            {Object.values(categories).map((category) => (
                                <option value={category.id} key={category.id}>
                                    {category.fa_title}
                                </option>
                            ))}
                        </select>
                        {errors.category_id ? (
                            <div className="error-msg">
                                {errors.category_id}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="en_title">
                            نام انگلیسی زیر دسته‌بندی
                        </label>
                        <input
                            type="text"
                            name="en_title"
                            id="en_title"
                            onChange={handleChange}
                            value={values.en_title}
                        />
                        {errors.en_title ? (
                            <div className="error-msg">{errors.en_title}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="fa_title">
                            نام فارسی زیر دسته‌بندی
                        </label>
                        <input
                            type="text"
                            name="fa_title"
                            id="fa_title"
                            onChange={handleChange}
                            value={values.fa_title}
                        />
                        {errors.fa_title ? (
                            <div className="error-msg">{errors.fa_title}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="slug">نامک زیر دسته‌بندی</label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            onChange={handleChange}
                            value={values.slug}
                        />
                        {errors.slug ? (
                            <div className="error-msg">{errors.slug}</div>
                        ) : null}
                    </div>
                    <div className="submit-admin-form">
                        <button type="submit">ثبت</button>
                    </div>
                </form>
            </div>
            {loading && <AdminLoading />}
            <ToastContainer />
        </AdminLayout>
    );
}
