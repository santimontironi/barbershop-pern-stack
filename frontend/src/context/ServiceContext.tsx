import { createContext, useState } from "react";
import type { Service, NewServiceResponse, NewServiceData, ServicesResponse, ServiceDeleteResponse } from "../types/services.types";
import type { LoadingState } from "../types/ui.state";
import { createServiceService, getServicesService, deleteServiceService } from "../services/serviceService";
import { Outlet } from "react-router-dom";

type ServiceContextType = {
    services: Service[],
    createService: (data: NewServiceData) => Promise<NewServiceResponse>,
    fetchServices: () => Promise<ServicesResponse>,
    deleteService: (id: number) => Promise<ServiceDeleteResponse>,
    loading: LoadingState
}

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const ServiceProvider = () => {

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<LoadingState>({});

    const fetchServices = async () => {
        setLoading(prev => ({ ...prev, fetchServices: true }));
        try{
            const response = await getServicesService();
            setServices(response.data.services);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching services:", error);
            throw error;
        }
        finally {
            setLoading(prev => ({ ...prev, fetchServices: false }));
        }
    }

    const createService = async (data: NewServiceData) => {
        try {
            setLoading(prev => ({ ...prev, createService: true }));
            const response = await createServiceService(data);
            setServices(prev => [...prev, response.data.service]);
            return response.data;
        } catch (error) {
            console.error("Error creating service:", error);
            throw error;
        }
        finally {
            setLoading(prev => ({ ...prev, createService: false }));
        }
    }

    const deleteService = async (id: number) => {
        try{
            const response = await deleteServiceService(id);
            setServices(prev => prev.filter(service => service.id !== id));
            return response.data;
        } catch (error) {
            console.error("Error deleting service:", error);
            throw error;
        }
    }

    return <ServiceContext.Provider value={{services, createService, fetchServices, deleteService, loading}}>
        <Outlet />
    </ServiceContext.Provider>
}

export default ServiceProvider;