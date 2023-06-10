import moment from "jalali-moment";

export default function SingleArticleContent({ article }) {
    return (
        <>
            <div className="single-article-title">
                <h2>{article.data.title}</h2>
            </div>
            <div className="single-article-info">
                <div className="single-category-time">
                    <span>{article.data.fa_category}</span>
                    <span>{article.data.subcategory}</span>
                    <span>
                        {moment(article.data.create_time)
                            .locale("fa")
                            .format("dddd D MMMM y")}
                    </span>
                </div>
                <div className="single-author">
                    <span>سبحان کاظمی</span>
                </div>
            </div>
            <div className="single-article-cover">
                <img
                    src={`${article.data.thumbnail}`}
                    alt={`${article.data.thumbnail}`}
                />
            </div>
            <div
                className="single-article-content"
                dangerouslySetInnerHTML={{
                    __html: article.data.content,
                }}
            ></div>
        </>
    );
}
