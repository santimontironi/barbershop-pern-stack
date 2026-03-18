import { useDashboardAdmin } from "../hooks/useDashboardAdmin"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import HeaderDashboardAdmin from "../components/layout/HeaderDashboardAdmin"
import useAuth from "../hooks/useAuth"

const AdminPanel = () => {

    const auth = useAuth();

    const navigate = useNavigate();

    const { user, logout } = auth;

    const { loading, fetchData } = useDashboardAdmin();

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(user && user.role !== "admin"){
            navigate("/panel-usuario")
        }
    }, [user, navigate])

    return (
        <section className="min-h-screen w-full">
            {loading ? <Loader /> : (
                <div className="flex">
                    <HeaderDashboardAdmin logout={logout} />

                    <main>
                        <p>HOLA</p>
                    </main>
                </div>

                
            )}
        </section>
    )
}

export default AdminPanel