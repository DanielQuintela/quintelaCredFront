import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate()

    return (

        <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
            ← Voltar
        </button>
    )
}