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
    email?: string;
    username?: string;
    password: string;
}

export interface LoginUserResponse {
    message: string;
    user: {
        id: number,
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
    }
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
  id: number;
  role: string;
}

export interface DashboardUserResponse {
    user: User
}

export interface DashboardAdminResponse {
    admin: Admin
}

export interface confirmRegisterResponse {
    message: string;
}
