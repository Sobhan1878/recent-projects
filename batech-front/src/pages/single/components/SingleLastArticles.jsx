import { Link } from "react-router-dom";

export default function SingleLastArticles({ lastArticles }) {
    return (
        <div className="single-last-articles">
            {lastArticles.map((lastArticle) => {
                return (
                    <Link
                        to={`/${lastArticle.en_category}/${lastArticle.slug}`}
                        key={lastArticle.slug}
                    >
                        <div className="last-article-item">
                            <p>{lastArticle.title}</p>
                            <img
                                src={`${lastArticle.thumbnail}`}
                                alt={`${lastArticle.thumbnail}`}
                            />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
