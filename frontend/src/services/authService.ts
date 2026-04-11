import axios from "axios";

import type { LoginUserResponse, RegisterUserData, RegisterUserResponse, LoginUserData, LoginAdminData, LoginAdminResponse, DashboardUserResponse, DashboardAdminResponse, AuthType, UpdateUserData, UpdateUserResponse } from "../types/auth.types"

const API_URL = import.meta.env.VITE_API_URL;

export const registerUserService = (data: RegisterUserData) => {
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("photo", data.photo[0]);

    return axios.post<RegisterUserResponse>(`${API_URL}/registerUser`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
}

export const loginUserService = (data: LoginUserData) => {
    return axios.post<LoginUserResponse>(`${API_URL}/loginUser`, data, { withCredentials: true });
}

export const dashboardUserService = () => {
    return axios.get<DashboardUserResponse>(`${API_URL}/dashboardUser`, { withCredentials: true });
}

export const loginAdminService = (data: LoginAdminData) => {
    return axios.post<LoginAdminResponse>(`${API_URL}/loginAdmin`, data, { withCredentials: true });
}

export const dashboardAdminService = () => {
    return axios.get<DashboardAdminResponse>(`${API_URL}/dashboardAdmin`, { withCredentials: true });
}

export const logoutService = () => {
    return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
}

export const meService = () => {
    return axios.get<AuthType>(`${API_URL}/me`, { withCredentials: true });
}

export const confirmRegisterService = (token: string) => {
    return axios.get(`${API_URL}/confirmRegister/${token}`);
}

export const updateUserService = (data: UpdateUserData) => {
    const formData = new FormData();
    formData.append("phone", data.phone);
    if (data.photo && data.photo.length > 0) {
        formData.append("photo", data.photo[0]);
    }
    return axios.patch<UpdateUserResponse>(`${API_URL}/updateUser`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
}