import { useState } from "react"

interface CancelTurnModalProps {
    onClose: () => void
    onConfirm: (reason: string) => Promise<void>
}

const CancelTurnModal = ({ onClose, onConfirm }: CancelTurnModalProps) => {
    const [reason, setReason] = useState("")

    const handleConfirm = async () => {
        await onConfirm(reason)
        setReason("")
    }

    const handleClose = () => {
        setReason("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                <div className="h-1 w-full bg-linear-to-r from-red-600 to-red-500" />

                <div className="p-6 flex flex-col gap-5">

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-white font-bold text-xl leading-tight">Cancelar turno</h2>
                            <p className="text-zinc-400 text-sm mt-1">Esta acción no se puede deshacer.</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200 shrink-0 cursor-pointer"
                        >
                            <i className="bi bi-x-lg text-xl" />
                        </button>
                    </div>

                    <div className="border-t border-zinc-800" />

                    <div className="flex flex-col gap-2">
                        <label className="text-zinc-300 text-sm font-medium flex items-center gap-1.5">
                            <i className="bi bi-chat-left-text text-red-400/70 text-xs" />
                            Motivo de cancelación
                            <span className="text-zinc-600 font-normal">(opcional)</span>
                        </label>
                        <select name="cancelReason" id="cancelReason" className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors duration-200" value={reason} onChange={(e) => setReason(e.target.value)}>
                            <option value="">Seleccioná un motivo</option>
                            <option value="cliente_no_asiste">Cliente no asiste</option>
                            <option value="cliente_llega_tarde">Cliente llega tarde</option>
                            <option value="problema_interno">Problema interno</option>
                            <option value="servicio_no_disponible">Servicio no disponible</option>
                            <option value="corte_de_luz">Corte de luz</option>
                            <option value="emergencia">Emergencia</option>
                            <option value="otro">Otro</option>
                        </select>
                        <span className="text-zinc-600 text-xs text-right font-mono">{reason.length}/200</span>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-300 text-sm font-medium transition-all duration-200 hover:bg-zinc-700 hover:text-white disabled:opacity-50 cursor-pointer"
                        >
                            Volver
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-950/40 text-red-400 text-sm font-medium transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/60 hover:text-red-300 disabled:opacity-50 cursor-pointer"
                        >

                            <i className="bi bi-x-circle text-sm" />
                            Cancelar turno
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CancelTurnModal
