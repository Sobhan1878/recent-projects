import Home from "../pages/Home/Home";
import AddArticle from "../pages/admin/Article/AddArticle";
import MainAdmin from "../pages/admin/MainAdmin";
import AddCategory from "../pages/admin/Category/AddCategory";
import AddSubcategory from "../pages/admin/Subcategory/addSubcategory";
import CategoryList from "../pages/admin/Category/CategoryList";
import ArticleList from "../pages/admin/Article/ArticleList";
import EditArticle from "../pages/admin/Article/EditArticle";
import SingleArticle from "../pages/single/SingleArticle";
import Auth from "../pages/Auth/Auth";

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
    {
        path: "/admin/add-category",
        element: <AddCategory />,
    },
    {
        path: "/admin/add-subcategory",
        element: <AddSubcategory />,
    },
    {
        path: "/admin/categories",
        element: <CategoryList />,
    },
    {
        path: "/admin/articles",
        element: <ArticleList />,
    },
    {
        path: "/admin/edit-article/:slug",
        element: <EditArticle />,
    },
    {
        path: "/:category/:slug",
        element: <SingleArticle />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
];

export default routes;
