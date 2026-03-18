export interface RegisterUserData {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    photo: FileList;
}

export interface RegisterUserResponse {
    message: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    message: string;
    user: {
        id: number;
        role: string;
    };
}

export interface LoginAdminData {
    username: string;
    password: string;
}

export interface LoginAdminResponse {
    message: string;
    admin: {
        id: number;
        role: string;
    };
}

export interface AuthType {
    user: {
        id: number;
        role: string;
    };
}

export interface Session {
    id: number;
    role: string;
}

export interface User {
    id: number;
    role?: string;
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    photo?: string;
}

export interface Admin {
    id: number;
    role: string;
}

export interface DashboardUserResponse {
    user: User;
}

export interface DashboardAdminResponse {
    admin: Admin;
}

export interface confirmRegisterResponse {
    message: string;
}
