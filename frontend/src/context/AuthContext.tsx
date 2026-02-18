import { createContext, useState, useEffect } from "react";
import { registerUserService, loginUserService, loginAdminService,dashboardUserService,dashboardAdminService, logoutService} from "../services/authService";
import type {AuthUser, RegisterUserData, LoadingState, LoginUserData, LoginAdminData } from "../types";

type AuthContextType = {
    user: AuthUser | null,
    registerUser: (data: RegisterUserData) => Promise<void>,
    loginUser: (data: LoginUserData) => Promise<void>,
    loginAdmin: (data: LoginAdminData) => Promise<void>,
    logout: () => void,
    loading: LoadingState,
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<LoadingState>({ 
        register: false, 
        login: false, 
        dashboard: false 
    });

    const registerUser = async (data: RegisterUserData) => {
        try {
            setLoading(prev => ({ ...prev, register: true }));
            const response = await registerUserService(data);
            setUser({
                id: response.data.user.id
            })
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
        } catch (error) {
            console.error("Error logging in admin:", error);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, login: false }));
        }
    }

    useEffect(() => {
        const getDashboard = async () => {
            try {
                setLoading(prev => ({ ...prev, dashboard: true }));
                
                if (!user) {
                    throw new Error("No user logged in");
                }
    
                if (user.role === 'user') {
                    const response = await dashboardUserService();
                    setUser({
                        ...response.data.user,
                        role: 'user'
                    });
                } else if (user.role === 'admin') {
                    const response = await dashboardAdminService();
                    setUser({
                        id: response.data.admin.id,
                        username: response.data.admin.username,
                        role: 'admin'
                    });
                }
            } catch (error) {
                console.error("Error fetching dashboard:", error);
                throw error;
            } finally {
                setLoading(prev => ({ ...prev, dashboard: false }));
            }
        };

        getDashboard();
    }, [user?.id, user?.role]);

    const logout = async () => {
        try {
            await logoutService();
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setUser(null);
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
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
