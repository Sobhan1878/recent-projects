import cover1 from "../assets/img/banners/ban main/ban3.jpg";

export default function HeadNewsCard() {
    return (
        <div className="header-news-item">
            <div className="cover">
                <img src={cover1} alt="" />
            </div>
            <h3 className="title">
                از M3 خبری نیست؛ مک بوک ایر 15 اینچی احتمالاً با «تراشه هم‌سطح
                M2» معرفی می‌شود
            </h3>
            <div className="info">
                <div className="author">
                    <span>اسم نویسنده</span>
                </div>
                <div className="createdAt">تایم خبر</div>
                <div className="category">دسته‌بندی خبر</div>
            </div>
        </div>
    );
}
