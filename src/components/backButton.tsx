import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate()

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
            <ArrowLeft size={18} />
            Voltar
        </button>
    )
}