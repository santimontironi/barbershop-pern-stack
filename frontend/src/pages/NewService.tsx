import { useForm } from "react-hook-form";
import useServices from "../hooks/useServices";
import Loader from "../components/ui/Loader";
import type { NewServiceData } from "../types/services.types";

const NewService = () => {

    const { createService, loading } = useServices();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewServiceData>();

    async function formSubmit(data: NewServiceData) {
        try {
            await createService(data);
            alert("Servicio creado exitosamente");
            reset();
        }
        catch (error: any) {
            console.error("Error creating service:", error.response?.data?.message);
            reset();
        }
    }

    return (
        <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">

            <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-10"></div>
            <div className="pointer-events-none absolute bottom-40 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-10"></div>
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-200 rounded-full blur-3xl opacity-5"></div>

            {loading.createService ? <Loader /> : (
                <div className="w-full max-w-2xl">

                    <div className="mb-8 flex items-center gap-3">
                        <div>
                            <h1 className="text-amber-100 font-semibold text-lg tracking-wide leading-none">
                                Nuevo servicio
                            </h1>
                            <p className="text-white text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[22px] tracking-wide mt-1">
                                Completá los campos para agregar un servicio
                            </p>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-5">
                            
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase">
                                    Nombre
                                </label>
                                <input id="name" type="text" placeholder="Ej: Corte clásico" {...register("name", { required: "Nombre es requerido" })} className={`w-full bg-zinc-800/60 border rounded-xl px-4 py-3 text-sm text-amber-50 placeholder:text-zinc-600 outline-none transition-all duration-200 ${errors.name ? "border-red-700/60 focus:border-red-500" : "border-zinc-700/50 focus:border-amber-500/50 focus:bg-zinc-800"} `}
                                />
                                {errors.name && (
                                    <span className="flex items-center gap-1.5 text-xs text-red-400">
                                        <i className="bi bi-exclamation-circle text-xs" />
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    placeholder="Describí el servicio brevemente..."
                                    {...register("description", { required: "Descripción es requerida" })}
                                    className={`
                                        w-full bg-zinc-800/60 border rounded-xl px-4 py-3
                                        text-sm text-amber-50 placeholder:text-zinc-600
                                        outline-none transition-all duration-200 resize-none
                                        ${errors.description
                                            ? "border-red-700/60 focus:border-red-500"
                                            : "border-zinc-700/50 focus:border-amber-500/50 focus:bg-zinc-800"
                                        }
                                    `}
                                />
                                {errors.description && (
                                    <span className="flex items-center gap-1.5 text-xs text-red-400">
                                        <i className="bi bi-exclamation-circle text-xs" />
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="duration" className="text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase">
                                        Duración (hs)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="duration"
                                            placeholder="1"
                                            {...register("duration", {
                                                required: "Requerido",
                                                min: { value: 1, message: "Mínimo 1 hora" }
                                            })}
                                            className={`
                                                w-full bg-zinc-800/60 border rounded-xl px-4 py-3 pr-10
                                                text-sm text-amber-50 placeholder:text-zinc-600
                                                outline-none transition-all duration-200
                                                ${errors.duration
                                                    ? "border-red-700/60 focus:border-red-500"
                                                    : "border-zinc-700/50 focus:border-amber-500/50 focus:bg-zinc-800"
                                                }
                                            `}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">
                                            hs
                                        </span>
                                    </div>
                                    {errors.duration && (
                                        <span className="flex items-center gap-1 text-xs text-red-400">
                                            <i className="bi bi-exclamation-circle text-xs" />
                                            {errors.duration.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="price"
                                        className="text-xs font-medium tracking-[0.15em] text-zinc-400 uppercase"
                                    >
                                        Precio
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            id="price"
                                            placeholder="0"
                                            {...register("price", {
                                                required: "Requerido",
                                                min: { value: 0, message: "Debe ser positivo" }
                                            })}
                                            className={`
                                                w-full bg-zinc-800/60 border rounded-xl pl-7 pr-4 py-3
                                                text-sm text-amber-50 placeholder:text-zinc-600
                                                outline-none transition-all duration-200
                                                ${errors.price
                                                    ? "border-red-700/60 focus:border-red-500"
                                                    : "border-zinc-700/50 focus:border-amber-500/50 focus:bg-zinc-800"
                                                }
                                            `}
                                        />
                                    </div>
                                    {errors.price && (
                                        <span className="flex items-center gap-1 text-xs text-red-400">
                                            <i className="bi bi-exclamation-circle text-xs" />
                                            {errors.price.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-zinc-800 my-1" />

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                                    bg-amber-500 hover:bg-amber-400 active:bg-amber-600
                                    text-zinc-950 text-sm font-semibold tracking-wide
                                    transition-all duration-200 shadow-[0_4px_16px_rgba(245,158,11,0.25)]
                                    hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)]
                                    cursor-pointer"
                            >
                                <i className="bi bi-plus-circle-fill text-base" />
                                Crear servicio
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}

export default NewService