import {
    FaTelegram,
    FaLinkedin,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-first-row">
                <div className="batech-socialmedia">
                    <h3>شبکه‌های اجتماعی باتِک</h3>
                    <div className="socialmedia-caption">
                        <p>
                            شبکه‌های اجتماعی باتِک سریع‌ترین روش دسترسی به اخبار
                            فناوری، علم و خودرو است.
                        </p>
                        <p>
                            اگر می‌خواهید به‌روز باشید، شبکه‌های اجتماعی دیجیاتو
                            را دنبال کنید.
                        </p>
                    </div>
                    <div className="social-media-links">
                        <a>
                            <FaInstagram />
                        </a>
                        <a>
                            <FaTelegram />
                        </a>
                        <a>
                            <FaLinkedin />
                        </a>
                        <a>
                            <FaTwitter />
                        </a>
                        <a>
                            <FaYoutube />
                        </a>
                    </div>
                </div>
                <div className="batech-news-mail">
                    <h3>عضویت در خبرنامه</h3>
                    <div className="newsmail-form">
                        <input
                            type="text"
                            name="newsmail"
                            id="newsmail"
                            placeholder="نشانی ایمیل خود را وارد کنید."
                        />
                        <div className="submit-btn">
                            <button type="submit">عضویت</button>
                        </div>
                    </div>
                    <div className="warning-alert">
                        <span>
                            مطمئن باشید که هرگز از سمت ما ایمیل‌های مزاحم (اسپم)
                            دریافت نخواهید کرد.
                        </span>
                    </div>
                </div>
            </div>
            <div className="line-breacker odd"></div>
            <div className="footer-second-row">
                <div className="footer-column">
                    <h3>باتِک</h3>
                    <div className="footer-links">
                        <a>تبلیغات</a>
                        <a>تماس با ما</a>
                        <a>درباره‌ی ما</a>
                        <a>موقعیت‌های شغلی</a>
                        <a>شرایط بازنشر</a>
                        <a>شرایط خدمت‌رسانی</a>
                    </div>
                </div>
                <div className="footer-column">
                    <h3>حامیان باتِک</h3>
                    <div className="footer-links">
                        <a>پارس پک | میزبانی و پشتیبانی</a>
                        <a>وب رخ | حس خوب پیکسل‌ها</a>
                    </div>
                </div>
            </div>
            <div className="line-breacker even"></div>
            <div className="copy-right">
                <p>تمامی حقوق برای وبسایت باتِک محفوظ است.</p>
            </div>
        </div>
    );
}
