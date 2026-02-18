import axios from "axios";
import type { LoginUserResponse, RegisterUserData, RegisterUserResponse, LoginUserData, LoginAdminData, LoginAdminResponse,DashboardUserResponse, DashboardAdminResponse } from "../types"
const API_URL = import.meta.env.VITE_API_URL;

// User services
export const registerUserService = (data: RegisterUserData) => {
    return axios.post<RegisterUserResponse>(`${API_URL}/registerUser`, data, { withCredentials: true });
}

export const loginUserService = (data: LoginUserData) => {
    return axios.post<LoginUserResponse>(`${API_URL}/loginUser`, data, { withCredentials: true });
}

export const dashboardUserService = () => {
    return axios.get<DashboardUserResponse>(`${API_URL}/dashboardUser`, { withCredentials: true });
}

// Admin services
export const loginAdminService = (data: LoginAdminData) => {
    return axios.post<LoginAdminResponse>(`${API_URL}/loginAdmin`, data, { withCredentials: true });
}

export const dashboardAdminService = () => {
    return axios.get<DashboardAdminResponse>(`${API_URL}/dashboardAdmin`, { withCredentials: true });
}

// Common services
export const logoutService = () => {
    return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
}

export const meService = () => {
    return axios.get(`${API_URL}/me`, { withCredentials: true });
}