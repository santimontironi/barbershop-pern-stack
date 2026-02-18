import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VerifyAuth = ({children} : any) => {
    const auth = useContext(AuthContext);

    if (!auth) return null;

    const { user, loading } = auth;

    if (loading.dashboard) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    if (user.role === "user") {
        return <Navigate to="/panel" replace />;
    }

    return children;
};

export default VerifyAuth;