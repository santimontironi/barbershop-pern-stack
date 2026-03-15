import { useDashboardUser } from "../hooks/useDashboardUser"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import HeaderDashboardUser from "../components/layout/HeaderDashboardUser"
import NewTurnBtn from "../components/ui/NewTurnBtn"

const UserPanel = () => {
  const auth = useAuth()
  const { user, logout } = auth
  const navigate = useNavigate()
  const { data, loading, fetchData } = useDashboardUser()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (user && user.role !== "user") {
      navigate("/panel-admin")
    }
  }, [user, navigate])

  return (
    <section className="relative h-screen w-full bg-linear-to-br from-blue-950 to-blue-900 overflow-hidden">

      <div className="hidden md:block absolute rounded-full top-0 left-0 w-96 h-96 bg-blue-500 blur-3xl opacity-20"></div>
      <div className="hidden md:block absolute rounded-full bottom-0 right-0 w-96 h-96 bg-blue-700 blur-3xl opacity-20"></div>

      {loading ? <Loader /> : (
        <div>
          <HeaderDashboardUser photo={data?.photo} name={data?.name} logout={logout} />

          <NewTurnBtn />

        </div>
      )}
    </section>
  )
}

export default UserPanel