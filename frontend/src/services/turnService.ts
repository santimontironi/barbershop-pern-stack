import axios from "axios";
import type { TurnsUserResponse, TurnsAdminResponse, TurnsAdminAllResponse, ActiveUserTurnResponse, NewTurnData, NewTurnResponse } from "../types/turns.types";

const API_URL = import.meta.env.VITE_API_URL;

export const getTurnsUserService = () => {
    return axios.get<TurnsUserResponse>(`${API_URL}/userTurns`, { withCredentials: true });
}

export const getTurnsAdminService = () => {
    return axios.get<TurnsAdminResponse>(`${API_URL}/adminTurns`, { withCredentials: true });
}

export const getAllAdminTurnsService = () => {
    return axios.get<TurnsAdminAllResponse>(`${API_URL}/allAdminTurns`, { withCredentials: true });
}

export const activeTurnService = () => {
    return axios.get<ActiveUserTurnResponse>(`${API_URL}/activeTurn`, { withCredentials: true });
}

export const newTurnService = (data: NewTurnData) => {
    return axios.post<NewTurnResponse>(`${API_URL}/newTurn`, data, { withCredentials: true });
}

export const cancelTurnByUserService = (turnId: number) => {
    return axios.patch(`${API_URL}/cancelTurnByUser/${turnId}`, {}, { withCredentials: true });
}

export const cancelTurnByAdminService = (turnId: number, cancel_reason: string) => {
    return axios.patch(`${API_URL}/cancelTurnByAdmin/${turnId}`, { cancel_reason }, { withCredentials: true });
}