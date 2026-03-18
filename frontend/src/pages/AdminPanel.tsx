import { useDashboardAdmin } from "../hooks/useDashboardAdmin"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import HeaderDashboardAdmin from "../components/layout/HeaderDashboardAdmin"
import useAuth from "../hooks/useAuth"
import useTurns from "../hooks/useTurns"
import AdminTurn from "../components/layout/AdminTurn"

const AdminPanel = () => {

    const { user, logout } = useAuth();
    const { fetchTurnsAdmin, turnsAdmin } = useTurns();

    const navigate = useNavigate();

    const { loading, fetchData } = useDashboardAdmin();

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(user && user.role !== "admin"){
            navigate("/panel-usuario")
        }
    }, [user, navigate])

    useEffect(() => {
        fetchTurnsAdmin();
    }, [])

    return (
        <section className="min-h-screen w-full">
            {loading ? <Loader /> : (
                <div className="flex">
                    <HeaderDashboardAdmin logout={logout} />

                    <main>
                        {turnsAdmin.length === 0 && <p>No hay turnos activos</p>}
                        
                        {turnsAdmin.map(turn => <AdminTurn key={turn.id} turn={turn} />)}
                    </main>
                </div>

                
            )}
        </section>
    )
}

export default AdminPanel