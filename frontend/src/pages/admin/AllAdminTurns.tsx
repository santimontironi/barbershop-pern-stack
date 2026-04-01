import useTurns from "../../hooks/useTurns"
import { useEffect, useState } from "react"
import Loader from "../../components/ui/Loader"
import AllAdminTurnCard from "../../components/admin/AllAdminTurnCard"

const AllAdminTurns = () => {
    const { fetchAllTurnsAdmin, allTurnsAdmin, loading, searchTurnsByUser } = useTurns();
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAllTurnsAdmin();
    }, [])

    const filteredTurns = searchTurnsByUser(search);

    return (
        <section className="min-h-screen bg-black px-5 py-20 md:px-10 xl:px-20 2xl:px-40">
            {loading.allAdminTurns ? <Loader /> : (
                <div>
                    <div className="mb-10">
                        <span className="block text-yellow-500/60 text-xs tracking-widest uppercase font-mono mb-1">Gestión</span>
                        <h1 className="text-white font-serif font-bold text-3xl md:text-4xl xl:text-5xl">
                            Historial de <span className="text-yellow-400">Turnos</span>
                        </h1>
                        <div className="mt-3 w-16 h-0.5 bg-yellow-500 rounded-full" />
                    </div>

                    <div className="relative mb-8 max-w-sm">
                        <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Buscar por nombre de usuario..."
                            className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                    </div>

                    {allTurnsAdmin.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800">
                                <i className="bi bi-calendar-x text-zinc-600 text-3xl" />
                            </div>
                            <p className="text-zinc-200 text-xl font-bold tracking-wide">No hay turnos en el historial</p>
                        </div>
                    ) : filteredTurns.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800">
                                <i className="bi bi-person-x text-zinc-600 text-3xl" />
                            </div>
                            <p className="text-zinc-200 text-xl font-bold tracking-wide">No se encontraron turnos para <span className="text-yellow-400">"{search}"</span></p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredTurns.map(turn => (
                                <AllAdminTurnCard key={turn.id} turn={turn} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default AllAdminTurns
