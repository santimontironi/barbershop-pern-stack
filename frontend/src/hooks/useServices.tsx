import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useServices must be used within a ServiceProvider");
    }

    return context;
}

export default useServices