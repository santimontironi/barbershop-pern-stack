import { createContext, useState } from "react";
import type { Service, NewServiceResponse, NewServiceData, ServicesResponse } from "../types";
import { createServiceService, getServicesService } from "../services/serviceService";
import { Outlet } from "react-router-dom";

type ServiceContextType = {
    services: Service[],
    createService: (data: NewServiceData) => Promise<NewServiceResponse>,
    fetchServices: () => Promise<ServicesResponse>
}

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const ServiceProvider = () => {

    const [services, setServices] = useState<Service[]>([]);

    const fetchServices = async () => {
        try{
            const response = await getServicesService();
            setServices(response.data.services);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching services:", error);
            throw error;
        }
    }

    const createService = async (data: NewServiceData) => {
        try {
            const response = await createServiceService(data);
            setServices(prev => [...prev, response.data.service]);
            return response.data;
        } catch (error) {
            console.error("Error creating service:", error);
            throw error;
        }
    }

    return <ServiceContext.Provider value={{services, createService, fetchServices}}>
        <Outlet />
    </ServiceContext.Provider>
}

export default ServiceProvider;