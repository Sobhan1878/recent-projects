import { useEffect, useState } from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import Request from "../../../services/request";
import MainNewsCard from "../../Home/components/MainNewsCard";
import { Link, Navigate } from "react-router-dom";
import AdminLoading from "../components/AdminLoading";

const req = new Request();

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [needToEdit, setNeedToEdit] = useState("");

    useEffect(() => {
        if (!articles.length) {
            req.get("article/").then((res) => setArticles(res.data));
        }
    }, [articles]);

    useEffect(() => {
        if (needToEdit.length) {
            return () => setNeedToEdit("");
        }
    }, [needToEdit]);

    if (needToEdit.length) {
        return <Navigate to={`/admin/edit-article/${needToEdit}`} />;
    }

    const handleNeedToEditArticle = (slug) => {
        setNeedToEdit(slug);
    };

    console.log(needToEdit);

    return (
        <AdminLayout>
            <h3 className="site-title">لیست مقالات</h3>
            <div className="article-list">
                {articles.length ? (
                    articles.map((article) => (
                        <div className="admin-article-item" key={article.slug}>
                            <Link to={article.en_category + "/" + article.slug}>
                                <MainNewsCard data={article} />
                            </Link>
                            <div className="article-admin-links">
                                <button
                                    type="submit"
                                    onClick={() =>
                                        handleNeedToEditArticle(article.slug)
                                    }
                                >
                                    ویرایش
                                </button>
                                <button type="submit">حذف</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <AdminLoading />
                )}
            </div>
        </AdminLayout>
    );
}
