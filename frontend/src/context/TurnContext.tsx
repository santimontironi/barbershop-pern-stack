import { createContext, useState } from "react";
import { getTurnsAdminService, getTurnsUserService } from "../services/turnService";
import type { TurnsUser, TurnsAdmin, LoadingState } from "../types";
import { Outlet } from "react-router-dom";

type TurnContextType = {
    turnsUser: TurnsUser[];
    turnsAdmin: TurnsAdmin[];
    fetchTurnsUser: () => Promise<void>;
    fetchTurnsAdmin: () => Promise<void>;
    loading: LoadingState;
}

export const TurnContext = createContext<TurnContextType | null>(null);

const TurnProvider = () => {
    const [turnsUser, setTurnsUser] = useState<TurnsUser[]>([]);
    const [turnsAdmin, setTurnsAdmin] = useState<TurnsAdmin[]>([]);
    const [loading, setLoading] = useState<LoadingState>({
        adminTurns: false,
        userTurns: false,
    });

    const fetchTurnsUser = async () => {
        setLoading(prev => ({ ...prev, userTurns: true }));
        try {
            const res = await getTurnsUserService();
            setTurnsUser(res.data.turns);
        } catch (error) {
            console.error("Error fetching user turns:", error);
        } finally {
            setLoading(prev => ({ ...prev, userTurns: false }));
        }
    }

    const fetchTurnsAdmin = async () => {
        setLoading(prev => ({ ...prev, adminTurns: true }));
        try {
            const res = await getTurnsAdminService();
            setTurnsAdmin(res.data.turns);
        } catch (error) {
            console.error("Error fetching admin turns:", error);
        }
        finally {
            setLoading(prev => ({ ...prev, adminTurns: false }));
        }
    }

    return (
        <TurnContext.Provider value={{ turnsUser, turnsAdmin, fetchTurnsUser, fetchTurnsAdmin, loading }}>
            <Outlet />
        </TurnContext.Provider>
    )
}

export default TurnProvider;