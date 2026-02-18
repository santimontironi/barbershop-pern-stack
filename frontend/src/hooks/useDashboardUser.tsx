import { dashboardUserService } from "../services/authService";
import { useState } from "react";
import type { User } from "../types";

export const useDashboardUser = () => {
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await dashboardUserService();
            setData({
                id: res.data.user.id,
                role: res.data.user.role,
                name: res.data.user.name,
                surname: res.data.user.surname,
                username: res.data.user.username,
                photo: res.data.user.photo,
                email: res.data.user.email
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, fetchData };
};