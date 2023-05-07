import moment from "jalali-moment";
import { Link } from "react-router-dom";

export default function HeadNewsCard({ article }) {
    return article ? (
        <Link to={`/${article.en_category}/${article.slug}`}>
            <div className="header-news-item">
                <div className="cover">
                    <img src={article.thumbnail} alt="" />
                </div>
                <h3 className="title">{article.title}</h3>
                <div className="info">
                    <div className="author">
                        <span>اسم نویسنده</span>
                    </div>
                    <div className="createdAt">
                        {moment(article.create_time).locale("fa").fromNow()}
                    </div>
                    <div className="category">{article.fa_category}</div>
                    <div className="subcategory">{article.subcategory}</div>
                </div>
            </div>
        </Link>
    ) : (
        <span>loading</span>
    );
}
