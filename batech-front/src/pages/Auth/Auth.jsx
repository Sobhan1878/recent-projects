import "./auth.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="heading auth">
            <div className="auth-form register">
                <div className="auth-form-header">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="batech logo" />
                        </Link>
                    </div>
                    <h3>ثبت‌نام</h3>
                </div>
                <form>
                    <div className="form-item">
                        <input type="text" name="username" id="username" />
                        <span>نام کاربری</span>
                    </div>
                    <div className="form-item">
                        <input type="text" name="email" id="email" />
                        <span>ایمیل</span>
                    </div>
                    <div className="form-item">
                        <input type="password" name="password" id="password" />
                        <span>رمز عبور</span>
                    </div>
                    <div className="form-item">
                        <input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                        />
                        <span>تایید رمز عبور</span>
                    </div>
                    <div className="auth-form-footer">
                        <div className="submit-form">
                            <button type="submit">ثبت‌نام</button>
                        </div>
                        <div className="auth-form-links">
                            <button type="submit">وارد شوید</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
