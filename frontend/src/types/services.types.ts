export interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
}

export interface ServicesResponse {
    services: Service[];
}

export interface NewServiceData {
    name: string;
    description: string;
    duration: number;
    price: number;
}

export interface NewServiceResponse {
    service: Service;
}
