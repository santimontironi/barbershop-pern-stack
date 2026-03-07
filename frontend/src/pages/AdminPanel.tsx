import { useDashboardAdmin } from "../hooks/useDashboardAdmin"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AdminPanel = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth) return null;

    const { user } = auth;

    const { loading, fetchData, data } = useDashboardAdmin();

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(user && user.role !== "admin"){
            navigate("/panel-usuario")
        }
    }, [user, navigate])

    return (
        <section>
            {loading ? <Loader /> : (
                <div>
                    {data?.username} {data?.role}
                </div>
            )}
        </section>
    )
}

export default AdminPanel