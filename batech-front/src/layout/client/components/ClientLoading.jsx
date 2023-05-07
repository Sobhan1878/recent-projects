import { ScaleLoader } from "react-spinners";

export default function ClientLoading() {
    return (
        <div className="client-loading">
            <ScaleLoader color={"var(--btn-color)"} height={20} />
        </div>
    );
}
