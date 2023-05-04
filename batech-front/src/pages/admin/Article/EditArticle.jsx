import { useParams } from "react-router-dom";
import AddArticle from "./AddArticle";
import Request from "../../../services/request";
import { useEffect, useState } from "react";
import AdminLoading from "../components/AdminLoading";
import AdminLayout from "../../../layout/admin/AdminLayout";

const req = new Request();

export default function EditArticle() {
    const params = useParams();

    const [article, setArticle] = useState({});
    useEffect(() => {
        if (!Object.values(article).length) {
            req.get(`article/${params.slug}/`).then((res) =>
                setArticle(res.data)
            );
        }
    }, [article]);

    return Object.values(article).length ? (
        <AddArticle editableArticle={article} />
    ) : (
        <AdminLayout>
            <AdminLoading />
        </AdminLayout>
    );
}
