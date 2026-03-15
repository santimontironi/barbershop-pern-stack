import axios from "axios";
import type { TurnsUserResponse, TurnsAdminResponse, NextUserTurnResponse} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getTurnsUserService = () => {
    return axios.get<TurnsUserResponse>(`${API_URL}/userTurns`, { withCredentials: true });
}

export const getTurnsAdminService = () => {
    return axios.get<TurnsAdminResponse>(`${API_URL}/adminTurns`, { withCredentials: true });
}

export const nextTurnService = () => {
    return axios.get<NextUserTurnResponse>(`${API_URL}/nextTurn`, { withCredentials: true });
}