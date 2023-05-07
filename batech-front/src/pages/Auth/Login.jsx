import { useFormik } from "formik";
import { loginValidation } from "../../services/formValidationSchema";
import { Link } from "react-router-dom";
import Request from "../../services/request";

const req = new Request();

export default function Login({ handleActiveForm, handleLoggedInUser, logo }) {
    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik(
        {
            initialValues: {
                username: "",
                password: "",
            },
            validationSchema: loginValidation,
            onSubmit: () => {
                req.post("user/login/", values).then((res) =>
                    handleLoggedInUser(res.data)
                );
                resetForm();
            },
        }
    );
    return (
        <div className="auth-form login">
            <div className="auth-form-header">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="batech logo" />
                    </Link>
                </div>
                <h3>ورود</h3>
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
                <div className="auth-form-footer">
                    <div className="submit-form">
                        <button type="submit">ورود</button>
                    </div>
                    <div className="auth-form-links">
                        <button
                            type="submit"
                            onClick={() => handleActiveForm("register")}
                        >
                            ثبت‌نام
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
