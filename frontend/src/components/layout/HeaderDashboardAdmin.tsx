import type { HeaderDashboardAdminProps } from "../../types/ui.state"
import { useState } from "react"

const HeaderDashboardAdmin = ({ logout, selected, onSelect }: HeaderDashboardAdminProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header>
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-amber-600/40 text-amber-400 shadow-[0_4px_14px_rgba(0,0,0,0.6)] cursor-pointer"
            >
                <i className="bi bi-list text-xl" />
            </button>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed md:sticky top-0 left-0 z-50 w-64 min-h-screen bg-zinc-950 border-r border-amber-700/20 shadow-[4px_0_32px_rgba(0,0,0,0.7)] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}>

                <div className="px-6 py-7 border-b border-zinc-400 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30">
                            <i className="bi bi-scissors text-amber-400 text-sm" />
                        </div>
                        <span className="text-amber-100 font-semibold text-xs tracking-[0.18em] uppercase leading-none">
                            Panel Admin
                        </span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg text-zinc-500 hover:text-amber-300 hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
                    >
                        <i className="bi bi-x-lg text-sm" />
                    </button>
                </div>

                <div className="px-6 pt-5 pb-2">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                        Gestión
                    </span>
                </div>

                <nav className="flex flex-col gap-1 px-3 flex-1">
                    <button
                        onClick={() => { onSelect("turns"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer
                            ${selected === "turns" ? "bg-amber-500/20 text-amber-200 border border-amber-500/40" : "text-zinc-300 hover:text-amber-200 hover:bg-zinc-800/70"}`}
                    >
                        <i className="bi bi-calendar-check text-base text-amber-400" />
                        <span>Turnos activos</span>
                    </button>

                    <button
                        onClick={() => { onSelect("newService"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer
                            ${selected === "newService" ? "bg-amber-500/20 text-amber-200 border border-amber-500/40" : "text-zinc-300 hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-amber-200"}`}
                    >
                        <i className="bi bi-plus-circle-fill text-base text-amber-400" />
                        <span>Agregar servicio</span>
                    </button>

                    <button
                        onClick={() => { onSelect("services"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer
                            ${selected === "services" ? "bg-amber-500/20 text-amber-200 border border-amber-500/40" : "text-zinc-300 hover:text-amber-200 hover:bg-zinc-800/70"}`}
                    >
                        <i className="bi bi-scissors text-base text-amber-400" />
                        <span>Listado de servicios</span>
                    </button>
                </nav>

                <div className="px-3 py-5 border-t border-zinc-400">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200
                            text-zinc-400 hover:text-red-300 hover:bg-red-950/50 hover:border-red-800/30
                            border border-transparent cursor-pointer"
                    >
                        <i className="bi bi-box-arrow-right text-base" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>

            </aside>
        </header>
    )
}

export default HeaderDashboardAdmin