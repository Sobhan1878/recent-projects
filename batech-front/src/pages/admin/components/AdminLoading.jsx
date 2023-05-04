import { ScaleLoader } from "react-spinners";

export default function AdminLoading() {
    return (
        <div className="loading">
            <ScaleLoader color={"var(--btn-color)"} height={20} />
        </div>
    );
}
