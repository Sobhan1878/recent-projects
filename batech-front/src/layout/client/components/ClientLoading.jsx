import { ScaleLoader } from "react-spinners";

export default function ClientLoading() {
    return (
        <div className="client-loading">
            <ScaleLoader color="#fff" height={20} />
        </div>
    );
}
