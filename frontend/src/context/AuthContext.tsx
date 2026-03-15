import { createContext, useState, useEffect } from "react";
import { registerUserService, loginUserService, loginAdminService, meService, logoutService, confirmRegisterService } from "../services/authService";
import type { Session, RegisterUserData, RegisterUserResponse, LoadingState, LoginUserData, LoginAdminData, LoginAdminResponse, LoginUserResponse, confirmRegisterResponse } from "../types";
import { Outlet } from "react-router-dom";

type AuthContextType = {
    user: Session | null,
    registerUser: (data: RegisterUserData) => Promise<RegisterUserResponse>,
    loginUser: (data: LoginUserData) => Promise<LoginUserResponse>,
    loginAdmin: (data: LoginAdminData) => Promise<LoginAdminResponse>,
    logout: () => void,
    loading: LoadingState,
    confirmRegister: (token: string) => Promise<confirmRegisterResponse>,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = () => {

    const [user, setUser] = useState<Session | null>(null);
    
    const [loading, setLoading] = useState<LoadingState>({
        register: false,
        login: false,
        dashboard: true,
        confirm: false
    });

    const registerUser = async (data: RegisterUserData) => {
        try {
            setLoading(prev => ({ ...prev, register: true }));
            const response = await registerUserService(data);
            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, register: false }));
        }
    }

    const loginUser = async (data: LoginUserData) => {
        try {
            setLoading(prev => ({ ...prev, login: true }));
            const response = await loginUserService(data);
            setUser({
                id: response.data.user.id,
                role: response.data.user.role
            })
            return response.data;
        } catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, login: false }));
        }
    }

    const loginAdmin = async (data: LoginAdminData) => {
        try {
            setLoading(prev => ({ ...prev, login: true }));
            const response = await loginAdminService(data);
            setUser({
                id: response.data.admin.id,
                role: response.data.admin.role
            })
            return response.data;
        } catch (error) {
            console.error("Error logging in admin:", error);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, login: false }));
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await meService();
                setUser({
                    id: res.data.user.id,
                    role: res.data.user.role
                });
            } catch (error: any) {
                setUser(null);
            } finally {
                setLoading(prev => ({ ...prev, dashboard: false }));
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await logoutService();
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        } finally {
            setUser(null);
        }
    }

    const confirmRegister = async (token: string) => {
        try {
            setLoading(prev => (
                { ...prev, confirm: true }));
            const response = await confirmRegisterService(token);
            return response.data;
        } catch (error) {
            console.error("Error confirming registration:", error);
            throw error;
        }
        finally {            
            setLoading(prev => ({ ...prev, confirm: false }));
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            registerUser,
            loginUser,
            loginAdmin,
            logout,
            loading,
            confirmRegister,
        }}>
            <Outlet />
        </AuthContext.Provider>
    )
}

export default AuthProvider;
