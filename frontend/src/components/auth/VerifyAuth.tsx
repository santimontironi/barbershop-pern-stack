import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../ui/Loader";


const VerifyAuth = ({children}: any) => {
    
    const { user, loading } = useAuth();

    if (loading.dashboard) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default VerifyAuth;