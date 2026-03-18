import { dashboardUserService } from "../services/authService";
import { useState } from "react";
import type { User } from "../types/auth.types";

export const useDashboardUser = () => {
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await dashboardUserService();
            setData(res.data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    };

    return { data, loading, fetchData };
};