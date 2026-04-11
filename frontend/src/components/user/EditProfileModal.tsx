import { useForm } from "react-hook-form"
import { useState } from "react"
import type { UpdateUserData } from "../../types/auth.types"

interface EditProfileModalProps {
    currentPhone: string
    onClose: () => void
    onConfirm: (data: UpdateUserData) => Promise<void>
}

const EditProfileModal = ({ currentPhone, onClose, onConfirm }: EditProfileModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateUserData>({
        defaultValues: { phone: currentPhone }
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    const onSubmit = async (data: UpdateUserData) => {
        try {
            setErrorMessage(null)
            await onConfirm(data)
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Error al actualizar los datos.")
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-blue-950 border border-blue-800/50 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                <div className="h-1 w-full bg-linear-to-r from-red-600 to-blue-500" />

                <div className="p-6 flex flex-col gap-5">

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-white font-bold text-xl leading-tight">Editar perfil</h2>
                            <p className="text-blue-300/50 text-sm mt-1">Actualizá tu teléfono o foto de perfil.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-blue-400/50 hover:text-blue-200 transition-colors duration-200 shrink-0 cursor-pointer"
                        >
                            <i className="bi bi-x-lg text-xl" />
                        </button>
                    </div>

                    <div className="border-t border-blue-800/40" />

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-blue-200/70 text-xs tracking-widest">
                                <i className="bi bi-telephone text-red-400 mr-1.5" />
                                Teléfono
                            </label>
                            <input
                                id="phone"
                                type="text"
                                placeholder="Ej: 11 1234-5678"
                                className="w-full bg-blue-900/30 border border-blue-800/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 placeholder:text-blue-300/30"
                                {...register("phone", { required: "El teléfono es obligatorio." })}
                            />
                            {errors.phone && (
                                <span className="text-red-400 text-xs flex items-center gap-1">
                                    <i className="bi bi-exclamation-circle" />
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="photo" className="text-blue-200/70 text-xs tracking-widest">
                                <i className="bi bi-image text-red-400 mr-1.5" />
                                Foto de perfil
                                <span className="text-blue-400/40 normal-case tracking-normal font-sans ml-1">(opcional)</span>
                            </label>

                            {photoPreview && (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-red-500/50 ring-2 ring-red-500/20"
                                />
                            )}

                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="w-full bg-blue-900/30 border border-blue-800/50 text-blue-200/70 text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-red-500/20 file:text-red-400 hover:file:bg-red-500/30 cursor-pointer"
                                {...register("photo")}
                                onChange={(e) => {
                                    register("photo").onChange(e)
                                    handlePhotoChange(e)
                                }}
                            />
                        </div>

                        {errorMessage && (
                            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                                <i className="bi bi-exclamation-triangle text-red-400 text-base shrink-0" />
                                <p className="text-red-300 text-sm">{errorMessage}</p>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mt-1">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-blue-700/50 bg-blue-900/30 text-blue-300 text-sm font-medium transition-all duration-200 hover:bg-blue-800/40 hover:text-white cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white text-sm font-medium shadow-[0_4px_14px_rgba(220,38,38,0.3)] transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="bi bi-arrow-repeat animate-spin text-sm" />
                                        <span>Guardando...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-lg text-sm" />
                                        <span>Guardar cambios</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditProfileModal
