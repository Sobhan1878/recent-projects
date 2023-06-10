import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { registerValidation } from "../../services/formValidationSchema";
import Request from "../../services/request";
import { ScaleLoader } from "react-spinners";

const req = new Request();

export default function Rgister({
    handleActiveForm,
    handleLoggedInUser,
    logo,
    setLoading,
    onLoad,
}) {
    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik(
        {
            initialValues: {
                username: "",
                email: "",
                password: "",
                confirm_password: "",
            },
            validationSchema: registerValidation,
            onSubmit: () => {
                setLoading(true);
                req.post("user/", values).then((res) =>
                    handleLoggedInUser(res.data)
                );
                resetForm();
            },
        }
    );
    return (
        <div className="auth-form register">
            {onLoad && (
                <div className="form-loader">
                    <ScaleLoader color="#fff" height={20} />
                </div>
            )}
            <div className="auth-form-header">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="batech logo" />
                    </Link>
                </div>
                <h3>ثبت‌نام</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`form-item ${values.username && "active"}`}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        value={values.username}
                    />
                    <span>
                        نام کاربری{" "}
                        {errors.username ? (
                            <div className="error-msg">{errors.username}</div>
                        ) : null}
                    </span>
                </div>
                <div className={`form-item ${values.email && "active"}`}>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                    />
                    <span>
                        ایمیل{" "}
                        {errors.email ? (
                            <div className="error-msg">{errors.email}</div>
                        ) : null}
                    </span>
                </div>
                <div className={`form-item ${values.password && "active"}`}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <span>
                        رمز عبور{" "}
                        {errors.password ? (
                            <div className="error-msg">{errors.password}</div>
                        ) : null}
                    </span>
                </div>
                <div
                    className={`form-item ${
                        values.confirm_password && "active"
                    }`}
                >
                    <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        onChange={handleChange}
                        value={values.confirm_password}
                    />
                    <span>
                        تایید رمز عبور{" "}
                        {errors.confirm_password ? (
                            <div className="error-msg">
                                {errors.confirm_password}
                            </div>
                        ) : null}
                    </span>
                </div>

                <div className="auth-form-footer">
                    <div className="submit-form">
                        <button type="submit">ثبت‌نام</button>
                    </div>
                    <div className="auth-form-links">
                        <button
                            type="submit"
                            onClick={() => handleActiveForm("login")}
                        >
                            ورود
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
