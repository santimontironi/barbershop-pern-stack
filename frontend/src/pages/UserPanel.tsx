import { useDashboardUser } from "../hooks/useDashboardUser"
import { useEffect, useContext } from "react"
import Loader from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const UserPanel = () => {
  const auth = useContext(AuthContext)

  if (!auth) return null;

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