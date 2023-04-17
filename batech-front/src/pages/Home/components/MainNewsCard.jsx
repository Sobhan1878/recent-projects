import banner1 from "../../../assets/img/banners/ban main/ban1.jpg";

export default function MainNewsCard() {
    return (
        <div className="main-news-item">
            <div
                className="cover-side"
                style={{
                    backgroundImage: "url(" + `${banner1}` + ")",
                }}
            >
                <div className="thumbnail">
                    <img src={banner1} alt="" />
                </div>
            </div>
            <div className="content-side">
                <div className="main-card-title">
                    <h3>
                        افشاگر خوش‌سابقه تأکید کرد: iOS 17 با پشتیبانی از
                        سایدلود اپلیکیشن‌ها از راه می‌رسد
                    </h3>
                </div>
                <div className="subtitle">
                    <p>
                        مارک گرمن، افشاگر خو‌ش‌سابقه، در گزارشی اختصاصی می‌گوید
                        اپل به‌دنبال اضافه‌کردن سایدلود اپلیکیشن‌ها به
                        سیستم‌عامل iOS 17 است.
                    </p>
                </div>
                <div className="main-card-info">
                    <strong className="autho">نویسنده</strong>
                    <strong className="category">دسته بندی</strong>
                    <strong className="subcategory">زیر دسته بندی</strong>
                    <strong className="date">تاریخ</strong>
                </div>
            </div>
        </div>
    );
}
