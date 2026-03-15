const NewTurnBtn = () => {
    return (
        <div className="px-5 md:px-8 xl:px-30 2xl:px-60 mt-10 md:mt-14 xl:mt-16 2xl:mt-23">

            <div className="relative w-fit bg-blue-950 border border-blue-700 rounded-lg shadow-lg p-6 md:p-8 xl:p-6 2xl:p-8">
                <button className="relative group flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-7 md:py-4 xl:px-9 xl:py-5 2xl:px-11 2xl:py-6 rounded-2xl border border-blue-400/40 hover:border-blue-300/50 bg-linear-to-br from-blue-500/90 to-blue-700/90 hover:from-blue-400 hover:to-blue-600 active:from-blue-600 active:to-blue-800 backdrop-blur-sm overflow-hidden shadow-[0_4px_20px_rgba(59,130,246,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] text-white font-semibold tracking-wide text-base md:text-lg xl:text-xl 2xl:text-2xl transition-all duration-300 cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-white/5 pointer-events-none" />
                    <span className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 rounded-xl border border-white/20 group-hover:border-white/30 bg-white/15 group-hover:bg-white/25 shadow-inner transition-all duration-300">
                        <i className="bi bi-calendar2-plus text-base md:text-lg xl:text-xl" />
                    </span>
                    <span className="relative">Nuevo turno</span>
                    <i className="relative bi bi-arrow-right text-base md:text-lg xl:text-xl ml-0.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
            </div>

        </div>
    )
}

export default NewTurnBtn