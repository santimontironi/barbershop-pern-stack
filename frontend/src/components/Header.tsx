import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
            <nav className="container mx-auto px-6 py-4 md:py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/logo.jpg"
                            alt="Corte en Punto Logo"
                            className="w-17 h-17 md:w-25 md:h-25 rounded-lg object-cover shadow-lg"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#inicio"
                            className="text-white hover:text-red-400 transition font-medium"
                        >
                            Inicio
                        </a>
                        <a
                            href="#servicios"
                            className="text-slate-300 hover:text-red-400 transition font-medium"
                        >
                            Servicios
                        </a>
                        <a
                            href="#horarios"
                            className="text-slate-300 hover:text-red-400 transition font-medium"
                        >
                            Horarios
                        </a>
                        <a
                            href="#contacto"
                            className="text-slate-300 hover:text-red-400 transition font-medium"
                        >
                            Contacto
                        </a>
                    </div>

                    <Link to="/ingreso-usuario" className="hidden md:block bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 transform">
                        Reservar Cita
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-col space-y-4 py-4 border-t border-white/10">
                        <a
                            href="#inicio"
                            onClick={toggleMenu}
                            className="text-white hover:text-red-400 transition font-medium py-2 px-4 hover:bg-white/5 rounded-lg"
                        >
                            Inicio
                        </a>
                        <a
                            href="#servicios"
                            onClick={toggleMenu}
                            className="text-slate-300 hover:text-red-400 transition font-medium py-2 px-4 hover:bg-white/5 rounded-lg"
                        >
                            Servicios
                        </a>
                        <a
                            href="#horarios"
                            onClick={toggleMenu}
                            className="text-slate-300 hover:text-red-400 transition font-medium py-2 px-4 hover:bg-white/5 rounded-lg"
                        >
                            Horarios
                        </a>
                        <a
                            href="#contacto"
                            onClick={toggleMenu}
                            className="text-slate-300 hover:text-red-400 transition font-medium py-2 px-4 hover:bg-white/5 rounded-lg"
                        >
                            Contacto
                        </a>
                        <button
                            className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-red-500/30 text-center"
                            onClick={toggleMenu}
                        >
                            Reservar Cita
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header