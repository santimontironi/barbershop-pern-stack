export interface RegisterUserData {
    name: string;
    surname: string;
    username: string;
    photo: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    message: string;
    user: {
        id: number
    };
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

export interface DashboardUserResponse {
    user: {
        id: number;
        role: string;
        name: string;
        surname: string;
        username: string;
        photo: string;
        email: string;
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

export interface DashboardAdminResponse {
    admin: {
        id: number;
        username: string;
        role: string;
    };
}

export interface AuthContextType {
    auth: {
        id: number;
        role: string
    }
}

export interface AuthUser {
    id: number;
    role?: string;
    name?: string;
    surname?: string;
    username?: string;
    photo?: string;
    email?: string;
}
