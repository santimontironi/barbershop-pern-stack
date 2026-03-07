import { useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/ui/Loader";

const ConfirmedUser = () => {
  const { token } = useParams<{ token: string }>();

  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { confirmRegister, loading } = auth;

  const [messageResponse, setMessageResponse] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  useEffect(() => {
    const confirmUser = async () => {
      if (token) {
        try {
          const response = await confirmRegister(token);
          setMessageResponse(response.message);
        } catch (error: any) {
          setMessageError(error.response?.data?.message || "Error al confirmar el registro");
        }
      }
    };

    confirmUser();
  }, [token]);

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden flex items-center justify-center px-4">

      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white rounded-full blur-3xl opacity-5 pointer-events-none"></div>

      {loading.confirm ? <Loader /> : (
        <div className="relative w-full max-w-md">

          <div className="absolute inset-0 bg-linear-to-r from-violet-500 to-indigo-500 rounded-3xl blur-2xl opacity-20"></div>

          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl text-center">

            {messageResponse && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-4xl">✓</span>
                  </div>
                </div>

                <span className="bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30 inline-block mb-4">
                  💈 Cuenta confirmada
                </span>

                <h1 className="text-3xl font-bold text-white leading-tight mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                  ¡Todo listo!
                </h1>
                <p className="text-slate-300 text-sm mb-8">{messageResponse}</p>

                <Link
                  to="/login"
                  className="block w-full bg-linear-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transform"
                >
                  Iniciar sesión
                </Link>
              </>
            )}

            {messageError && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <span className="text-4xl">✕</span>
                  </div>
                </div>

                <span className="bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-2 rounded-full text-sm font-semibold border border-red-500/30 inline-block mb-4">
                  💈 Error de confirmación
                </span>

                <h1 className="text-3xl font-bold text-white leading-tight mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                  Algo salió mal
                </h1>
                <p className="text-red-300 text-sm mb-8">{messageError}</p>

                <Link
                  to="/register"
                  className="block w-full bg-linear-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transform"
                >
                  Volver al registro
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default ConfirmedUser;