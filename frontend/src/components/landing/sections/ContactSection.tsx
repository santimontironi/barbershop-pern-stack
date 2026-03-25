import { Link } from "react-router-dom"

const ContactSection = () => {
    return (
        <div className="bg-slate-900 py-24 px-6 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none" />

            <div className="relative container mx-auto max-w-3xl">
                <div className="text-center mb-14">
                    <span className="text-red-400/50 text-xs tracking-widest uppercase font-mono block mb-3">¿Querés contactarnos?</span>
                    <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight">Contacto</h2>
                    <div className="mt-5 w-16 h-0.5 bg-red-500 rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:border-white/20 hover:bg-white/7 transition-all duration-300">
                        <span className="text-3xl mb-4 block">📍</span>
                        <h4 className="text-white font-semibold mb-1.5">Dirección</h4>
                        <p className="text-slate-400 text-sm">Buenos Aires, Argentina</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:border-white/20 hover:bg-white/7 transition-all duration-300">
                        <span className="text-3xl mb-4 block">📱</span>
                        <h4 className="text-white font-semibold mb-1.5">WhatsApp</h4>
                        <p className="text-slate-400 text-sm">Escribinos para más info</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:border-white/20 hover:bg-white/7 transition-all duration-300">
                        <span className="text-3xl mb-4 block">📸</span>
                        <h4 className="text-white font-semibold mb-1.5">Instagram</h4>
                        <p className="text-slate-400 text-sm">Seguinos para novedades</p>
                    </div>
                </div>

                <div className="text-center border-t border-white/8 pt-10">
                    <Link
                        to="/ingreso-usuario"
                        className="inline-flex items-center gap-2.5 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-xl font-semibold text-base transition shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transform mb-10"
                    >
                        <i className="bi bi-calendar-check" />
                        Reservar mi turno
                    </Link>
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Corte en Punto · Todos los derechos reservados
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactSection
