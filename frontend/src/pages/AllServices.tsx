import useServices from "../hooks/useServices"
import { useEffect } from "react";
import Loader from "../components/ui/Loader";
import ServiceCard from "../components/layout/ServiceCard";

const AllServices = () => {

    const { services, loading, fetchServices } = useServices();

    useEffect(() => {
        fetchServices();
    }, [])

    return (
        <section className="bg-black">
            {loading.fetchServices ? <Loader /> : (
                <div>
                    <h1>Servicios</h1>
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default AllServices