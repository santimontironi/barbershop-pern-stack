import { Link } from "react-router-dom"

const NewTurnBtn = () => {
    return (
        <Link to="/nuevo-turno" className="group flex items-center gap-2 md:gap-2.5 px-4 py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white text-sm md:text-base xl:text-lg font-medium tracking-wide shadow-[0_4px_14px_rgba(220,38,38,0.35)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.55)] hover:brightness-110 transition-all duration-200 cursor-pointer">
            <i className="bi bi-plus-circle text-base md:text-lg" />
            <span>Nuevo turno</span>
        </Link>
    )
}

export default NewTurnBtn