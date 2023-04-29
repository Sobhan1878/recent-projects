import "./adminLayout.css";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
    const handleSideNavbar = (e) => {
        if (e.target.tagName !== "LI") {
            return;
        }
        e.target.children[0].classList.toggle("open-subnav");
    };

    return (
        <div className="admin">
            <div className="container">
                <div className="admin-page">
                    <AdminHeader />
                    <AdminSidebar handleNavbar={handleSideNavbar} />
                    <div className="admin-content">{children}</div>
                </div>
            </div>
        </div>
    );
}
