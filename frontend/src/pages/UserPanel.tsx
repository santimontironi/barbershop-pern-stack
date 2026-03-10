import { useDashboardUser } from "../hooks/useDashboardUser"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import HeaderDashboardUser from "../components/layout/HeaderDashboardUser"

const UserPanel = () => {
  const auth = useAuth()

  const { user, logout } = auth

  const navigate = useNavigate()
  
  const { data, loading, fetchData } = useDashboardUser()

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (user && user.role !== "user") {
      navigate("/panel-admin")
    }
  }, [user, navigate])

  return (
    <section className="h-screen w-full">
      {loading ? <Loader /> : (
        <div>
          <HeaderDashboardUser photo={data?.photo} name={data?.name} logout={logout} />
        </div>
      )}
    </section>
  )
}

export default UserPanel