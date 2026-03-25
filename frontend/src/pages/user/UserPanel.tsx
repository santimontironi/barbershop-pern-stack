import { useDashboardUser } from "../../hooks/useDashboardUser"
import { useEffect } from "react"
import Loader from "../../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTurns from "../../hooks/useTurns"
import HeaderDashboardUser from "../../components/layout/HeaderDashboardUser"
import ActiveTurn from "../../components/user/ActiveTurn"
import UserTurnsCard from "../../components/user/UserTurnsCard"

const UserPanel = () => {

  const auth = useAuth()
  const { user, logout } = auth
  const navigate = useNavigate()
  const { data, loading: dashboardLoading, fetchData } = useDashboardUser()
  const { fetchActiveTurn, activeTurn, cancelTurnByUser, fetchTurnsUser, turnsUser, loading: turnsLoading } = useTurns()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (user && user.role !== "user") navigate("/panel-admin")
  }, [user, navigate])

  useEffect(() => {
    fetchActiveTurn()
  }, [])

  useEffect(() => {
    fetchTurnsUser()
  }, [])

  return (
    <section className="relative min-h-screen w-full bg-linear-to-br from-blue-950 to-blue-900 overflow-hidden">
      <div className="hidden md:block absolute rounded-full top-0 left-0 w-96 h-96 bg-blue-500 blur-3xl opacity-20" />
      <div className="hidden md:block absolute rounded-full bottom-0 right-0 w-96 h-96 bg-red-700 blur-3xl opacity-10" />

      {dashboardLoading ? <Loader /> : (
        <div className="relative z-10">
          <HeaderDashboardUser photo={data?.photo} name={data?.name} logout={logout} />
          <ActiveTurn turn={activeTurn} cancelTurnByUser={() => activeTurn && cancelTurnByUser(activeTurn.id)} />

          {/* ===== HISTORIAL DE TURNOS ===== */}
          <div className="px-5 md:px-8 xl:px-30 2xl:px-60 mt-10 md:mt-14 pb-16">
            <div className="w-fit max-w-5xl">
              <h2 className="text-blue-100 font-bold text-[10px] xl:text-xs tracking-widest uppercase mb-5 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                Historial de turnos
              </h2>

              {turnsLoading.userTurns ? (
                <div className="flex items-center gap-2 text-blue-300/50 text-sm py-6">
                  <i className="bi bi-arrow-repeat animate-spin" />
                  Cargando historial...
                </div>
              ) : turnsUser.length === 0 ? (
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-2xl px-8 py-8 flex flex-col items-start gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <i className="bi bi-clock-history text-blue-400/40 text-2xl" />
                  <p className="text-slate-300 text-base font-medium">Sin historial de turnos</p>
                  <p className="text-slate-500 text-xs">Tus turnos pasados aparecerán aquí</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {turnsUser.map(turn => <UserTurnsCard key={turn.id} turn={turn} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default UserPanel