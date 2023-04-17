import Footer from "./Footer";
import Header from "./Header";
import "./clientLayout.css";

export default function ClientLayout({ children }) {
    return (
        <>
            <Header />
            <div className="content">
                <div className="container">{children}</div>
            </div>
            <Footer />
        </>
    );
}
