import { createContext, useState } from "react";
import { getTurnsAdminService, getTurnsUserService, newTurnService, activeTurnService, cancelTurnByUserService, cancelTurnByAdminService, getAllAdminTurnsService } from "../services/turnService";
import type { TurnsUser, TurnsAdmin, TurnsAdminAll, ActiveTurn, NewTurnData, NewTurnResponse } from "../types/turns.types";
import type { LoadingState } from "../types/ui.types";
import { Outlet } from "react-router-dom";

type TurnContextType = {
    turnsUser: TurnsUser[];
    turnsAdmin: TurnsAdmin[];
    allTurnsAdmin: TurnsAdminAll[];
    activeTurn: ActiveTurn | null;
    fetchTurnsUser: () => Promise<void>;
    fetchTurnsAdmin: () => Promise<void>;
    fetchAllTurnsAdmin: () => Promise<void>;
    fetchActiveTurn: () => Promise<void>;
    cancelTurnByUser: (turnId: number) => Promise<void>;
    cancelTurnByAdmin: (turnId: number, cancel_reason: string) => Promise<void>;
    newTurn: (data: NewTurnData) => Promise<NewTurnResponse>;
    loading: LoadingState;
}

export const TurnContext = createContext<TurnContextType | null>(null);

const TurnProvider = () => {
    const [turnsUser, setTurnsUser] = useState<TurnsUser[]>([]);

    const [turnsAdmin, setTurnsAdmin] = useState<TurnsAdmin[]>([]);

    const [allTurnsAdmin, setAllTurnsAdmin] = useState<TurnsAdminAll[]>([]);

    const [activeTurn, setActiveTurn] = useState<ActiveTurn | null>(null);

    const [loading, setLoading] = useState<LoadingState>({
        adminTurns: false,
        allAdminTurns: false,
        userTurns: false,
        createTurn: false,
        cancelTurnByUser: false,
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

    const fetchAllTurnsAdmin = async () => {
        setLoading(prev => ({ ...prev, allAdminTurns: true }));
        try {
            const res = await getAllAdminTurnsService();
            setAllTurnsAdmin(res.data.turns);
        } catch (error) {
            console.error("Error fetching all admin turns:", error);
        } finally {
            setLoading(prev => ({ ...prev, allAdminTurns: false }));
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

    const cancelTurnByUser = async (turnId: number) => {
        setLoading(prev => ({ ...prev, cancelTurnByUser: true }));
        try{
            await cancelTurnByUserService(turnId);
            await fetchActiveTurn();
            setActiveTurn(null);
        }
        catch(error){
            console.error("Error canceling turn:", error);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, cancelTurnByUser: false }));
        }
    }

    const cancelTurnByAdmin = async (turnId: number, cancel_reason: string) => {
        try {
            await cancelTurnByAdminService(turnId, cancel_reason);
            setTurnsAdmin(prev => prev.filter(t => t.id !== turnId));
            setAllTurnsAdmin(prev => prev.map(t =>
                t.id === turnId ? { ...t, cancel_reason } : t
            ));
        }
        catch (error) {
            console.error("Error canceling turn by admin:", error);
            throw error;
        }
    }

    return (
        <TurnContext.Provider value={{ turnsUser, newTurn, turnsAdmin, allTurnsAdmin, fetchTurnsUser, fetchTurnsAdmin, fetchAllTurnsAdmin, loading, activeTurn, fetchActiveTurn, cancelTurnByUser, cancelTurnByAdmin }}>
            <Outlet />
        </TurnContext.Provider>
    )
}

export default TurnProvider;