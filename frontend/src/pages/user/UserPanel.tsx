import { useDashboardUser } from "../../hooks/useDashboardUser"
import { useEffect, useState } from "react"
import Loader from "../../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTurns from "../../hooks/useTurns"
import HeaderDashboardUser from "../../components/layout/HeaderDashboardUser"
import ActiveTurn from "../../components/user/ActiveTurn"
import TurnsHistoryTable from "../../components/user/TurnsHistoryTable"
import EditProfileModal from "../../components/user/EditProfileModal"
import type { UpdateUserData } from "../../types/auth.types"
import Swal from "sweetalert2"

const UserPanel = () => {

  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const { data, loading: dashboardLoading, fetchData } = useDashboardUser()
  const { fetchActiveTurn, activeTurn, cancelTurnByUser, fetchTurnsUser, turnsUser } = useTurns()
  const [showEditModal, setShowEditModal] = useState(false)

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

  const handleEditProfile = async (formData: UpdateUserData) => {
    await updateUser(formData)
    await fetchData()
    setShowEditModal(false)
    Swal.fire({
      icon: "success",
      title: "Perfil actualizado",
      text: "Tus datos fueron actualizados exitosamente.",
      confirmButtonColor: "#ef4444",
    })
  }

  return (
    <section className="relative min-h-screen w-full bg-linear-to-br from-blue-950 to-blue-900 overflow-hidden">
      <div className="hidden md:block absolute rounded-full top-0 left-0 w-96 h-96 bg-blue-500 blur-3xl opacity-20" />
      <div className="hidden md:block absolute rounded-full bottom-0 right-0 w-96 h-96 bg-red-700 blur-3xl opacity-10" />

      {showEditModal && data?.phone && (
        <EditProfileModal
          currentPhone={data.phone}
          onClose={() => setShowEditModal(false)}
          onConfirm={handleEditProfile}
        />
      )}

      {dashboardLoading ? <Loader /> : (
        <div className="relative z-10">
          <HeaderDashboardUser photo={data?.photo} name={data?.name} logout={logout} onEditProfile={() => setShowEditModal(true)} />

          <div className="px-5 md:px-8 xl:px-16 2xl:px-32 mt-10 md:mt-14 xl:mt-16 pb-16 flex flex-col md:flex-row gap-10 md:gap-10 xl:gap-14 items-start">

            <div className="w-full md:w-[45%] md:shrink-0">
              <ActiveTurn turn={activeTurn} cancelTurnByUser={() => activeTurn && cancelTurnByUser(activeTurn.id)} />
            </div>

            <div className="w-full md:flex-1 min-w-0">
              <h2 className="text-blue-100 font-bold text-[10px] xl:text-xs tracking-widest uppercase mb-5 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                Historial de turnos
              </h2>
              <TurnsHistoryTable turns={turnsUser} />
            </div>

          </div>
        </div>
      )}
    </section>
  )
}

export default UserPanel