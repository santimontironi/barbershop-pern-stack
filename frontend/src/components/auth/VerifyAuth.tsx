import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";


const VerifyAuth = ({children}: any) => {
    const auth = useContext(AuthContext);

    if (!auth) return null;

    const { user, loading } = auth;

    if (loading.dashboard) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default VerifyAuth;