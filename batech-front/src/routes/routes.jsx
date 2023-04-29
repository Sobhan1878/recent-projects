import Home from "../pages/Home/Home";
import AddArticle from "../pages/admin/Article/AddArticle";
import MainAdmin from "../pages/admin/MainAdmin";
import AddCategory from "../pages/admin/Category/AddCategory";
import AddSubcategory from "../pages/admin/Subcategory/addSubcategory";
import CategoryList from "../pages/admin/Category/CategoryList";
import ArticleList from "../pages/admin/Article/ArticleList";

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
];

export default routes;
