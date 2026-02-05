import { Link } from "react-router-dom"
import Header from "../components/Header"

const Home = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden pt-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white rounded-full blur-3xl opacity-5"></div>

                <section className="relative">
                    <div className="container mx-auto px-6 py-20 md:py-32">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-block">
                                    <span className="bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-2 rounded-full text-sm font-semibold border border-red-500/30">
                                        ✂️ Barbería Profesional
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                                    Tu estilo,
                                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white to-blue-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                                        siempre en punto
                                    </span>
                                </h1>

                                <p className="text-xl text-red-50 leading-relaxed">
                                    Bienvenido a tu nueva barbería de confianza. Estamos aquí para ofrecerte cortes modernos, atención personalizada y un espacio donde te sientas como en casa.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/nuevo-turno" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transform text-center">
                                        Agendar Turno
                                    </Link>
                                    <a href="#servicios" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition hover:scale-105 transform text-center">
                                        Ver Servicios
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col mt-10 items-center justify-center">
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-48 rounded-full shadow-2xl hidden lg:block overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-b from-red-500 via-white to-blue-600 opacity-60"></div>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 bg-linear-to-r from-red-500 to-blue-500 rounded-3xl blur-2xl opacity-30"></div>

                                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                                        <img
                                            src="/images/logo.jpg"
                                            alt="Corte en Punto"
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl"
                                        />
                                    </div>

                                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-linear-to-br from-red-700 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-3xl">✂️</span>
                                    </div>

                                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">💈</span>
                                    </div>
                                </div>

                                <div className="bg-white/10 mt-10 backdrop-blur-md rounded-xl shadow-2xl p-4 w-65 md:w-75 xl:w-97 border border-white/20">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-linear-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-white text-lg">📅</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white text-sm">Horario</div>
                                            <div className="text-xs text-slate-300">Lun - Sáb: 9:00 - 20:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home