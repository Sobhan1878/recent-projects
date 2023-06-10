import { Link } from "react-router-dom";

export default function SingleMostViewArticles({ mostViewArticles }) {
    return (
        <div className="single-most-view-articles">
            <h3 className="site-title">پربازدیدترین مطالب</h3>
            <div className="single-last-articles">
                {mostViewArticles.data.map((mostViewArticle) => {
                    return (
                        <Link
                            to={`/${mostViewArticle.en_category}/${mostViewArticle.slug}`}
                            key={mostViewArticle.slug}
                        >
                            <div className="last-article-item">
                                <p>{mostViewArticle.title}</p>
                                <img
                                    src={`${mostViewArticle.thumbnail}`}
                                    alt={`${mostViewArticle.thumbnail}`}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
