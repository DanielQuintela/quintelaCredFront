import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="group mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 
      dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer select-none"
    >
      <ArrowLeft 
        size={16} 
        className="group-hover:-translate-x-0.5 transition-transform duration-200" 
      />
      <span>Voltar</span>
    </button>
  )
}