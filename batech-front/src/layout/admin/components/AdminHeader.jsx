import logo from "../../../assets/img/logo.png";
import admin from "../../../assets/img/users/admin/admin.png";

export default function AdminHeader() {
    return (
        <div className="admin-header">
            <div className="admin-header-content">
                <div className="logo">
                    <img src={logo} alt="batech" />
                </div>
                <div className="user-info">
                    <div className="user-avatar">
                        <img src={admin} alt="admin" />
                    </div>
                    <div className="user-menu"></div>
                </div>
            </div>
        </div>
    );
}
