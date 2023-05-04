import AdminLayout from "../../../layout/admin/AdminLayout";
import { useFormik } from "formik";
import Request from "../../../services/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { addCategoryValidation } from "../../../services/formValidationSchema";
import AdminLoading from "../components/AdminLoading";

export default function AddCategory() {
    const [loading, setLoading] = useState(false);
    const { handleChange, handleSubmit, errors, values, resetForm } = useFormik(
        {
            initialValues: {
                en_title: "",
                fa_title: "",
                slug: "",
            },
            validationSchema: addCategoryValidation,
            onSubmit: async (values) => {
                setLoading(true);
                const result = await new Request().post("category/", values);
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
            <h3 className="site-title">افزودن دسته‌بندی جدید</h3>
            <div className="admin-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="en_title">نام انگلیسی دسته‌بندی</label>
                        <input
                            type="text"
                            name="en_title"
                            id="en_title"
                            autoComplete="off"
                            onChange={handleChange}
                            value={values.en_title}
                        />
                        {errors.en_title ? (
                            <div className="error-msg">{errors.en_title}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="fa_title">نام فارسی دسته‌بندی</label>
                        <input
                            type="text"
                            name="fa_title"
                            id="fa_title"
                            autoComplete="off"
                            onChange={handleChange}
                            value={values.fa_title}
                        />
                        {errors.fa_title ? (
                            <div className="error-msg">{errors.fa_title}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="slug">نامک دسته‌بندی</label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            autoComplete="off"
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
