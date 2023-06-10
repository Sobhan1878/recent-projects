import "./auth.css";
import logo from "../../assets/img/logo.png";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Rgister";
import { Navigate } from "react-router-dom";

export default function Auth() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loginError, setLoginError] = useState("");
    const [activeForm, setActiveForm] = useState("login");
    const [navtohome, setNavToHome] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(loggedInUser).includes("id")) {
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    id: loggedInUser.id,
                    name: loggedInUser.name,
                })
            );
            setNavToHome(true);
        }

        if (Object.keys(loggedInUser).includes("message")) {
            setLoginError(loggedInUser.message);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (Object.keys(loggedInUser).length && loading) {
            setLoading(false);
            return () => setLoggedInUser({});
        }
    }, [loading, loggedInUser]);

    if (navtohome) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="heading auth">
                {activeForm === "login" ? (
                    <Login
                        handleActiveForm={setActiveForm}
                        handleLoggedInUser={setLoggedInUser}
                        logo={logo}
                        setLoading={setLoading}
                        onLoad={loading}
                    />
                ) : (
                    <Register
                        handleActiveForm={setActiveForm}
                        handleLoggedInUser={setLoggedInUser}
                        logo={logo}
                        setLoading={setLoading}
                        onLoad={loading}
                    />
                )}
                {loginError.length > 0 && (
                    <span className="server-error">{loginError}</span>
                )}
            </div>
        </>
    );
}
