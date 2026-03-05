// -------------- Auth -------------- 

export interface RegisterUserData {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
}

export interface RegisterUserResponse {
    message: string;
}

export interface LoginUserData {
    identifier: string; // Puede ser email o username
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
    username?: string;
    phone?: string;
    email?: string;
}

export interface Admin {
    username: string;
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

// -------------- Forms --------------

export interface RegisterUserDataForm {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
}

// -------------- UI / State --------------

export interface LoadingState {
    register?: boolean;
    login?: boolean;
    dashboard?: boolean;
    confirm?: boolean;
    adminTurns?: boolean;
    userTurns?: boolean;
}

export interface GoBackProps {
    url: string;
}

// -------------- Turns --------------

export interface TurnsUser {
    id: number;
    date: string;
    time: string;
    date_start: string;
    time_end: string;
    notes: string | null;
    service_name: string;
}

export interface TurnsUserResponse {
    turns: TurnsUser[];
}

export interface TurnsAdmin extends TurnsUser {
    user_name: string;
    user_surname: string;
    user_phone: string;
}

export interface TurnsAdminResponse {
    turns: TurnsAdmin[];
}