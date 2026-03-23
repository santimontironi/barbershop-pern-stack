import axios from "axios";
import type { TurnsUserResponse, TurnsAdminResponse, ActiveUserTurnResponse, NewTurnData, NewTurnResponse } from "../types/turns.types";

const API_URL = import.meta.env.VITE_API_URL;

export const getTurnsUserService = () => {
    return axios.get<TurnsUserResponse>(`${API_URL}/userTurns`, { withCredentials: true });
}

export const getTurnsAdminService = () => {
    return axios.get<TurnsAdminResponse>(`${API_URL}/adminTurns`, { withCredentials: true });
}

export const activeTurnService = () => {
    return axios.get<ActiveUserTurnResponse>(`${API_URL}/activeTurn`, { withCredentials: true });
}

export const newTurnService = (data: NewTurnData) => {
    return axios.post<NewTurnResponse>(`${API_URL}/newTurn`, data, { withCredentials: true });
}