import { createContext, useState } from "react";
import { getTurnsAdminService, getTurnsUserService } from "../services/turnService";
import type { TurnsUser, TurnsAdmin } from "../types";
import { Outlet } from "react-router-dom";

type TurnContextType = {
    turnsUser: TurnsUser[];
    turnsAdmin: TurnsAdmin[];
    fetchTurnsUser: () => Promise<void>;
    fetchTurnsAdmin: () => Promise<void>;
}

export const TurnContext = createContext<TurnContextType | null>(null);

const TurnProvider = () => {
    const [turnsUser, setTurnsUser] = useState<TurnsUser[]>([]);
    const [turnsAdmin, setTurnsAdmin] = useState<TurnsAdmin[]>([]);

    const fetchTurnsUser = async () => {
        try {
            const res = await getTurnsUserService();
            setTurnsUser(res.data.turns);
        } catch (error) {
            console.error("Error fetching user turns:", error);
        }
    }

    const fetchTurnsAdmin = async () => {
        try {
            const res = await getTurnsAdminService();
            setTurnsAdmin(res.data.turns);
        } catch (error) {
            console.error("Error fetching admin turns:", error);
        }
    }

    return (
        <TurnContext.Provider value={{ turnsUser, turnsAdmin, fetchTurnsUser, fetchTurnsAdmin }}>
            <Outlet />
        </TurnContext.Provider>
    )
}

export default TurnProvider;