import moment from "jalali-moment";

export default function MainNewsCard({ data }) {
    return (
        <div className="main-news-item">
            <div
                className="cover-side"
                style={{
                    backgroundImage: `url(${data.thumbnail})`,
                }}
            >
                <div className="thumbnail">
                    <img src={data.thumbnail} alt={data.title} />
                </div>
            </div>
            <div className="content-side">
                <div className="main-card-title">
                    <h3>{data.title}</h3>
                </div>
                <div className="subtitle">
                    <p>{data.subtitle}</p>
                </div>
                <div className="main-card-info">
                    <span className="autho">نویسنده</span>
                    <span className="category">{data.fa_category}</span>
                    <span className="subcategory">{data.subcategory}</span>
                    <span className="date">
                        {moment(data.create_time).locale("fa").fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
}
