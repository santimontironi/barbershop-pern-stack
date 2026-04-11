import useServices from "../../hooks/useServices"
import { useEffect } from "react";
import Loader from "../../components/ui/Loader";
import ServiceCard from "../../components/admin/ServiceCard";

const AllServices = () => {

    const { services, loading, fetchServices, deleteService } = useServices();

    useEffect(() => {
        fetchServices();
    }, [])

    return (
        <section className="min-h-screen bg-black px-5 py-10 md:px-10 xl:px-20 2xl:px-40 relative overflow-hidden">

            <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-12"></div>
            <div className="pointer-events-none absolute bottom-40 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-12"></div>
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-200 rounded-full blur-3xl opacity-5"></div>

            {loading.fetchServices ? <Loader /> : (
                <div>
                    <div className="mb-10">
                        <h1 className="text-white font-serif font-bold text-3xl md:text-4xl xl:text-5xl">
                           <span className="text-yellow-400">Servicios</span>
                        </h1>
                        <div className="mt-3 w-16 h-0.5 bg-yellow-500 rounded-full" />
                    </div>

                    {services.length === 0 ? (
                        <p className="text-gray-400 text-lg">No hay servicios disponibles.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {services.map(service => (
                                <ServiceCard key={service.id} service={service} onDelete={() => deleteService(service.id)} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default AllServices