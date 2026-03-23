import { createContext, useState } from "react";
import { getTurnsAdminService, getTurnsUserService, newTurnService, activeTurnService } from "../services/turnService";
import type { TurnsUser, TurnsAdmin, ActiveTurn, NewTurnData, NewTurnResponse } from "../types/turns.types";
import type { LoadingState } from "../types/ui.state";
import { Outlet } from "react-router-dom";

type TurnContextType = {
    turnsUser: TurnsUser[];
    turnsAdmin: TurnsAdmin[];
    activeTurn: ActiveTurn | null;
    fetchTurnsUser: () => Promise<void>;
    fetchTurnsAdmin: () => Promise<void>;
    fetchActiveTurn: () => Promise<void>;
    newTurn: (data: NewTurnData) => Promise<NewTurnResponse>;
    loading: LoadingState;
}


export const TurnContext = createContext<TurnContextType | null>(null);

const TurnProvider = () => {
    const [turnsUser, setTurnsUser] = useState<TurnsUser[]>([]);

    const [turnsAdmin, setTurnsAdmin] = useState<TurnsAdmin[]>([]);

    const [activeTurn, setActiveTurn] = useState<ActiveTurn | null>(null);

    const [loading, setLoading] = useState<LoadingState>({
        adminTurns: false,
        userTurns: false,
        createTurn: false
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

    const newTurn = async (data: NewTurnData) => {
        setLoading(prev => ({ ...prev, createTurn: true }));
        try {
            const res = await newTurnService(data);
            await fetchActiveTurn();
            return res.data;
        } catch (error) {
            console.error("Error creating new turn:", error);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, createTurn: false }));
        }
    }

    const fetchActiveTurn = async () => {
        try {
            const res = await activeTurnService();
            setActiveTurn(res.data.activeTurn);
        } catch (error) {
            console.error("Error fetching next turn:", error);
        }
    }

    return (
        <TurnContext.Provider value={{ turnsUser, newTurn, turnsAdmin, fetchTurnsUser, fetchTurnsAdmin, loading, activeTurn, fetchActiveTurn }}>
            <Outlet />
        </TurnContext.Provider>
    )
}

export default TurnProvider;