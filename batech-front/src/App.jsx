import { Route, Routes } from "react-router-dom";
import routes from "./routes/routes";

export default function App() {
    return (
        <Routes>
            {routes.map((route) => {
                return <Route {...route} key={route.path} />;
            })}
        </Routes>
    );
}
