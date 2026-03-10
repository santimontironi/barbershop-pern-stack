import { useDashboardUser } from "../hooks/useDashboardUser"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const UserPanel = () => {
  const auth = useAuth()

  const { user } = auth

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
    <section>
      {loading ? <Loader /> : (
        <div>
          {data?.name} {data?.surname}
        </div>
      )}
    </section>
  )
}

export default UserPanel