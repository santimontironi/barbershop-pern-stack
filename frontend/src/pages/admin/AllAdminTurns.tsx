import useTurns from "../../hooks/useTurns"
import { useEffect } from "react"
import Loader from "../../components/ui/Loader"
import AllAdminTurnCard from "../../components/admin/AllAdminTurnCard"

const AllAdminTurns = () => {
    const { fetchAllTurnsAdmin, allTurnsAdmin, loading } = useTurns();

    useEffect(() => {
        fetchAllTurnsAdmin();
    }, [])

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

                    {allTurnsAdmin.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800">
                                <i className="bi bi-calendar-x text-zinc-600 text-3xl" />
                            </div>
                            <p className="text-zinc-200 text-xl font-bold tracking-wide">No hay turnos en el historial</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {allTurnsAdmin.map(turn => (
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
