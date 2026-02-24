import { useDashboardAdmin } from "../hooks/useDashboardAdmin"
import { useEffect } from "react"
import Loader from "../components/Loader"

const AdminPanel = () => {

    const { loading, fetchData, data } = useDashboardAdmin();

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <section>
            {loading ? <Loader /> : (
                <div>
                    {data?.username}
                </div>
            )}
        </section>
    )
}

export default AdminPanel