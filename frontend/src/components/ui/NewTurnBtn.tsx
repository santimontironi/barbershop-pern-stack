const NewTurnBtn = () => {
    return (
        <button className="group flex items-center gap-2 md:gap-2.5 px-4 py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3 rounded-xl border border-blue-500/40 hover:border-blue-400/70 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-white text-sm md:text-base xl:text-lg font-medium tracking-wide transition-all duration-300 cursor-pointer">
            <i className="bi bi-plus-circle text-base md:text-lg xl:text-xl group-hover:rotate-90 transition-transform duration-300" />
            <span>Nuevo turno</span>
        </button>
    )
}

export default NewTurnBtn