import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40">
            <nav className="container mx-auto px-4 py-3 md:py-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/logo.jpg"
                            alt="Corte en Punto Logo"
                            className="w-12 h-12 md:w-14 md:h-14 xl:w-18 xl:h-18 rounded-xl object-cover shadow-lg ring-1 ring-white/10"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        {['inicio', 'servicios', 'horarios', 'contacto'].map((section) => (
                            <a
                                key={section}
                                href={`#${section}`}
                                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white/8 capitalize text-sm tracking-wide"
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/ingreso-usuario"
                            className="group relative flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <i className="bi bi-calendar-check text-base"></i>
                            Reservar Cita
                        </Link>

                        <Link
                            to="/ingreso-admin"
                            className="group flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-white/6 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <i className="bi bi-gear text-base"></i>
                            Administración
                        </Link>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-col space-y-1 pt-3 pb-4 border-t border-white/10">
                        {[
                            { href: '#inicio', label: 'Inicio' },
                            { href: '#servicios', label: 'Servicios' },
                            { href: '#horarios', label: 'Horarios' },
                            { href: '#contacto', label: 'Contacto' },
                        ].map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={toggleMenu}
                                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium py-2.5 px-4 hover:bg-white/6 rounded-lg"
                            >
                                {label}
                            </a>
                        ))}

                        <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
                            <Link
                                to="/ingreso-usuario"
                                onClick={toggleMenu}
                                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 active:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-red-500/25"
                            >
                                <i className="bi bi-calendar-check text-base"></i>
                                Reservar Cita
                            </Link>

                            <Link
                                to="/ingreso-admin"
                                onClick={toggleMenu}
                                className="flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 active:bg-white/5 text-slate-300 hover:text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200"
                            >
                                <i className="bi bi-gear text-base"></i>
                                Administración
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header