import Home from "../pages/Home/Home";
import AddArticle from "../pages/admin/addArticle/AddArticle";
import MainAdmin from "../pages/admin/MainAdmin";

const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/admin",
        element: <MainAdmin />,
    },
    {
        path: "/admin/add-article",
        element: <AddArticle />,
    },
];

export default routes;
