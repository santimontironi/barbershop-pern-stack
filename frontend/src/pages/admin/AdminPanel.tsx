import { useDashboardAdmin } from "../../hooks/useDashboardAdmin"
import { useEffect, useState } from "react"
import Loader from "../../components/ui/Loader"
import { useNavigate } from "react-router-dom"
import HeaderDashboardAdmin from "../../components/layout/HeaderDashboardAdmin"
import useAuth from "../../hooks/useAuth"
import AllServices from "./AllServices"
import NewService from "./NewService"
import AdminTurns from "./AdminTurns"
import AllAdminTurns from "./AllAdminTurns"
import type { AdminPanelView } from "../../types/ui.types"

const AdminPanel = () => {

    const { user, logout } = useAuth();
    
    const navigate = useNavigate();

    const { loading, fetchData } = useDashboardAdmin();
    
    const [selectedItem, setSelectedItem] = useState<AdminPanelView>("turns");

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
                    <HeaderDashboardAdmin logout={logout} selected={selectedItem} onSelect={setSelectedItem} />

                    <main className="flex-1">
                        {selectedItem === "turns" && (<AdminTurns />)}

                        {selectedItem === "allTurns" && (<AllAdminTurns />)}

                        {selectedItem === "services" && <AllServices />}

                        {selectedItem === "newService" && <NewService />}
                    </main>
                </div>
            )}
        </section>
    )
}

export default AdminPanel