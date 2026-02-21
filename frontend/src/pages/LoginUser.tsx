import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import type { LoginUserDataForm } from "../types"


const LoginUser = () => {
    const auth = useContext(AuthContext)

    if (!auth) return null;

    const { loginUser } = auth

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginUserDataForm>()

    const onSubmit = (data: LoginUserDataForm) => {
        loginUser(data)
        reset()
    }

    return (
        <section className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden flex items-center justify-center px-4">

            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white rounded-full blur-3xl opacity-5 pointer-events-none"></div>

            <div className="relative w-full max-w-md">

                <div className="absolute inset-0 bg-linear-to-r from-red-500 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>

                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">

                    <div className="flex justify-center mb-6">
                        <span className="bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-2 rounded-full text-sm font-semibold border border-red-500/30">
                            ✂️ Barbería Profesional
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-white text-center leading-tight mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                        Bienvenido
                    </h1>
                    <p className="text-center text-slate-300 mb-8 text-sm">
                        Ingresá a tu cuenta para gestionar tus turnos
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                Correo electrónico o nombre de usuario
                            </label>
                            <input
                                type="text"
                                placeholder="tu@email.com o usuario123"
                                {...register("identifier", {
                                    required: "El correo o nombre de usuario es obligatorio"
                                })}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/30 transition backdrop-blur-sm"
                            />
                            {errors.identifier && (
                                <p className="mt-1.5 text-red-400 text-xs">{errors.identifier.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "La contraseña es obligatoria"
                                })}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/30 transition backdrop-blur-sm"
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-red-400 text-xs">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transform mt-2"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-slate-400 text-xs">¿No tenés cuenta?</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    <Link
                        to="/registro-usuario"
                        className="block w-full text-center bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-3 rounded-xl font-semibold transition hover:scale-105 transform"
                    >
                        Crear cuenta
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default LoginUser