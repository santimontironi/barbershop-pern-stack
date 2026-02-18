import { dashboardAdminService } from "../services/authService";
import { useState } from "react";
import type { Admin } from "../types/auth.types";

export const useDashboardAdmin = () => {
    const [data, setData] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await dashboardAdminService();
            setData({
                id: res.data.admin.id,
                role: res.data.admin.role
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, fetchData };
};