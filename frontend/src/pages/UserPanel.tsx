import { useDashboardUser } from "../hooks/useDashboardUser"
import { useEffect } from "react"
import Loader from "../components/Loader"

const UserPanel = () => {

  const { data, loading, fetchData } = useDashboardUser()

  useEffect(() => {
    fetchData();
  }, [])

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