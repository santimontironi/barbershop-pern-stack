import axios from "axios";
import type { NewServiceData, NewServiceResponse, ServicesResponse, ServiceDeleteResponse } from "../types/services.types"

const API_URL = import.meta.env.VITE_API_URL;

export const createServiceService = (data: NewServiceData) => {
    return axios.post<NewServiceResponse>(`${API_URL}/services`, data, { withCredentials: true });
}

export const getServicesService = () => {
    return axios.get<ServicesResponse>(`${API_URL}/services`, { withCredentials: true });
}

export const deleteServiceService = (id: number) => {
    return axios.delete<ServiceDeleteResponse>(`${API_URL}/services/${id}`, { withCredentials: true });
}