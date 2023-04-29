import { useEffect, useState } from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import Request from "../../../services/request";
import MainNewsCard from "../../Home/components/MainNewsCard";
import { ScaleLoader } from "react-spinners";

const req = new Request();

export default function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (!articles.length) {
            req.get("article/").then((res) => setArticles(res.data));
        }
    }, [articles]);

    console.log(articles);

    return (
        <AdminLayout>
            <h3 className="site-title">لیست مقالات</h3>
            <div className="article-list">
                {articles.length ? (
                    articles.map((article) => <MainNewsCard data={article} />)
                ) : (
                    <div className="loading">
                        <ScaleLoader color="#39609d" height={20} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
