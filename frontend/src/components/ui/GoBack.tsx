import { Link } from 'react-router-dom'
import type { GoBackProps } from "../../types/ui.state"

const GoBack = ({ url }: GoBackProps) => {
    return (
        <Link
            to={url}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-x-0.5 active:translate-x-0 group"
        >
            <i className="bi bi-arrow-left text-base transition-transform duration-200 group-hover:-translate-x-0.5"></i>
            Volver
        </Link>
    )
}

export default GoBack