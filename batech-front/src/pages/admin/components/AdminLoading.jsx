import { ScaleLoader } from "react-spinners";

export default function AdminLoading() {
    return (
        <div className="loading">
            <ScaleLoader color="#fff" height={20} />
        </div>
    );
}
