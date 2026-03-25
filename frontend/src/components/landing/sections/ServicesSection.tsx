import { Link } from "react-router-dom"
import ServiceItem from "../ServiceItem"

const ServicesSection = () => {
    return (
        <div className="bg-slate-900 py-28 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-red-400/50 text-xs tracking-widest uppercase font-mono block mb-3">Lo que hacemos</span>
                    <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight">
                        Nuestros{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-blue-400">
                            Servicios
                        </span>
                    </h2>
                    <div className="mt-5 w-16 h-0.5 bg-red-500 rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceItem
                        icon="✂️"
                        title="Corte clásico"
                        desc="Corte tradicional con acabado prolijo, adaptado a la forma de tu rostro y tu estilo."
                    />
                    <ServiceItem
                        icon="🪒"
                        title="Corte + Barba"
                        desc="Combo completo: corte de cabello y diseño profesional de barba en una sola sesión."
                    />
                    <ServiceItem
                        icon="💈"
                        title="Diseño de barba"
                        desc="Perfilado y modelado fino para definir y realzar el contorno de tu barba."
                    />
                    <ServiceItem
                        icon="✦"
                        title="Tratamiento capilar"
                        desc="Hidratación y cuidado profundo para mantener tu cabello sano, brillante y fuerte."
                    />
                </div>

                <div className="text-center mt-14">
                    <Link
                        to="/ingreso-usuario"
                        className="inline-flex items-center gap-2.5 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transform"
                    >
                        <i className="bi bi-calendar-check" />
                        Agendar mi turno
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServicesSection
