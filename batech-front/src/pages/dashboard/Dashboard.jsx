import { Link, Navigate } from "react-router-dom";
import ClientLayout from "../../layout/client/ClientLayout";
import noAvatar from "../../assets/img/users/noavatar.png";
import dashboard from "../../assets/img/dashboardmain.png";
import "./dashboard.css";
import { useEffect, useState } from "react";
import Request from "../../services/request";
import ClientLoading from "../Home/components/ClientLoading";

const req = new Request();

export default function Dashboard() {
    const [currentuser, setCurrentuser] = useState({});
    const [loading, setLoading] = useState(true);
    const [foceupdate, setForce] = useState(1);

    useEffect(() => {
        if (
            !Object.values(currentuser).length &&
            sessionStorage.getItem("user")
        ) {
            req.get(
                `user/${JSON.parse(sessionStorage.getItem("user"))["id"]}/`
            ).then((res) => setCurrentuser(res.data));
            setLoading(false);
        }
    }, [currentuser]);

    const handleLogout = (e) => {
        req.get("user_logout/").then((res) => {
            if (res.message) {
                sessionStorage.clear();
                setForce((x) => x + 1);
            }
        });
    };

    if (!sessionStorage.getItem("user")) {
        return <Navigate to={"/"} />;
    }

    return loading ? (
        <ClientLoading />
    ) : (
        <ClientLayout>
            <div className="dashboard">
                <div className="dashboard-acide">
                    <ul>
                        <li className="active">
                            <Link>مقالات مورد علاقه</Link>
                        </li>
                        <li>
                            <Link>اطلاعات کاربری</Link>
                        </li>
                        <li>
                            <Link>نظرات من</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}>خروج</Link>
                        </li>
                    </ul>
                </div>
                <div className="dashboard-content">
                    <div className="dashboard-header">
                        <div className="dashboard-name">
                            <h3>{currentuser.username}</h3>
                        </div>
                        <div className="avatar">
                            <img src={noAvatar} alt="" />
                        </div>
                    </div>
                    <div className="dashboard-main-content">
                        <div className="dahboard-main-page">
                            <img src={dashboard} alt="" />
                            <h3>به پنل کاربری خوش آمدید.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
