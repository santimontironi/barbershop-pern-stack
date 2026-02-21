import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { RegisterUserDataForm } from "../types";

const RegisterUser = () => {
    const auth = useContext(AuthContext);
    if (!auth) return null;

    const { registerUser } = auth;
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterUserDataForm>();

    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: RegisterUserDataForm) => {
        setErrorMessage(null);
        setResponseMessage(null);
        try {
            const res = await registerUser(data);
            setResponseMessage(res.message);
            reset()
        } catch (error: any) {
            console.log(error.response?.data?.error);
            setErrorMessage(error.response?.data?.message || "Error al registrar usuario");
            reset();
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden flex items-center justify-center px-4 py-12">

            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white rounded-full blur-3xl opacity-5 pointer-events-none"></div>

            <div className="relative w-full max-w-3xl">

                <div className="absolute inset-0 bg-linear-to-r from-violet-500 to-indigo-500 rounded-3xl blur-2xl opacity-20"></div>

                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">

                    <div className="flex justify-center mb-6">
                        <span className="bg-violet-500/20 backdrop-blur-sm text-violet-300 px-4 py-2 rounded-full text-sm font-semibold border border-violet-500/30">
                            💈 Crear Cuenta
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-white text-center leading-tight mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                        Registrate
                    </h1>
                    <p className="text-center text-slate-300 mb-8 text-sm">
                        Creá tu cuenta y comenzá a agendar turnos fácilmente
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    {...register("name", {
                                        required: "El nombre es obligatorio",
                                        minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                    })}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition backdrop-blur-sm"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-violet-400 text-xs">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu apellido"
                                    {...register("surname", {
                                        required: "El apellido es obligatorio"
                                    })}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition backdrop-blur-sm"
                                />
                                {errors.surname && (
                                    <p className="mt-1.5 text-violet-400 text-xs">{errors.surname.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                    Nombre de usuario
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre de usuario"
                                    {...register("username", {
                                        required: "El nombre de usuario es obligatorio"
                                    })}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition backdrop-blur-sm"
                                />
                                {errors.username && (
                                    <p className="mt-1.5 text-violet-400 text-xs">{errors.username.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+54 9 11 0000-0000"
                                    {...register("phone", {
                                        required: "El teléfono es obligatorio",
                                        pattern: {
                                            value: /^[+\d][\d\s\-().]{6,19}$/,
                                            message: "Teléfono inválido"
                                        }
                                    })}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition backdrop-blur-sm"
                                />
                                {errors.phone && (
                                    <p className="mt-1.5 text-violet-400 text-xs">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Correo inválido"
                                    }
                                })}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition backdrop-blur-sm"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-violet-400 text-xs">{errors.email.message}</p>
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
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition backdrop-blur-sm"
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-violet-400 text-xs">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transform mt-2"
                        >
                            Crear cuenta
                        </button>

                        {responseMessage && (
                            <div className="flex items-center gap-3 bg-green-500/15 border border-green-500/30 rounded-xl px-4 py-3 mt-2">
                                <span className="text-green-400 text-lg">✓</span>
                                <p className="text-green-300 text-sm font-medium">{responseMessage}</p>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="flex items-center gap-3 bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mt-2">
                                <span className="text-red-400 text-lg">✕</span>
                                <p className="text-red-300 text-sm font-medium">{errorMessage}</p>
                            </div>
                        )}
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-slate-400 text-xs">¿Ya tenés cuenta?</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    <Link
                        to="/login"
                        className="block w-full text-center bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-3 rounded-xl font-semibold transition hover:scale-105 transform"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterUser;