import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { LoginAdminData } from "../types/auth.types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginAdmin = () => {

    const auth = useContext(AuthContext);

    if (!auth) return null;

    const { loginAdmin, loading, user } = auth;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginAdminData>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: LoginAdminData) => {
        setErrorMessage(null);
        try {
            await loginAdmin(data);
            navigate("/panel-admin");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Credenciales incorrectas");
            reset();
        }
    };

    useEffect(() => {
        if (user && user.role === "admin") {
            navigate("/panel-admin");
        }
    }, [user, navigate]);

    return (
        <section className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden flex items-center justify-center px-4 py-12">

            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white rounded-full blur-3xl opacity-5 pointer-events-none"></div>

            <div className="relative w-full max-w-md">

                <div className="absolute inset-0 bg-linear-to-r from-violet-500 to-indigo-500 rounded-3xl blur-2xl opacity-20"></div>

                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">

                    <div className="flex justify-center mb-6">
                        <span className="bg-violet-500/20 backdrop-blur-sm text-violet-300 px-4 py-2 rounded-full text-sm font-semibold border border-violet-500/30">
                            🔐 Panel Administrativo
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-white text-center leading-tight mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                        Acceso Admin
                    </h1>
                    <p className="text-center text-slate-300 mb-8 text-sm">
                        Ingresá tus credenciales de administrador
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                placeholder="admin"
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
                            disabled={loading.login}
                            className="w-full bg-linear-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transform mt-2 flex items-center justify-center gap-2"
                        >
                            {loading.login ? (
                                <>
                                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                                    Ingresando...
                                </>
                            ) : (
                                "Ingresar"
                            )}
                        </button>

                        {errorMessage && (
                            <div className="flex items-center gap-3 bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mt-2">
                                <span className="text-red-400 text-lg">✕</span>
                                <p className="text-red-300 text-sm font-medium">{errorMessage}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginAdmin;