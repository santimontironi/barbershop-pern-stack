import type { AllAdminTurnProps } from "../../types/turns.types"
import { formatDateShort, formatTime } from "../../utils/formatTurn"

const AllAdminTurnCard = ({ turn }: AllAdminTurnProps) => {
    return (
        <div className="group relative 2xl:w-100 xl:w-80 w-full flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_24px_rgba(239,68,68,0.10)]">

            <div className="h-1 w-full bg-linear-to-r from-red-600 to-red-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex flex-col gap-5 p-6">

                <div className="flex items-center gap-4">
                    <img
                        src={turn.user_photo}
                        alt={`${turn.user_name} ${turn.user_surname}`}
                        className="w-14 h-14 rounded-full object-cover border-2 border-zinc-700 shrink-0"
                    />
                    <div>
                        <p className="text-white font-semibold text-base leading-tight">
                            {turn.user_name} {turn.user_surname}
                        </p>
                        <p className="flex items-center gap-1.5 text-zinc-400 text-sm mt-1">
                            <i className="bi bi-telephone text-yellow-500/70" />
                            {turn.user_phone}
                        </p>
                    </div>
                </div>

                <div className="border-t border-zinc-800" />

                <div className="flex flex-col gap-3">
                    <p className="flex items-center gap-2 text-white text-base font-medium">
                        <i className="bi bi-scissors text-yellow-400 text-lg" />
                        {turn.service_name}
                    </p>
                    <p className="flex items-center gap-2 text-zinc-400 text-sm">
                        <i className="bi bi-calendar-event text-yellow-500/70" />
                        {formatDateShort(turn.date_turn)} — {formatTime(turn.time_turn)}
                    </p>
                </div>

                {turn.notes && (
                    <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3">
                        <span className="text-yellow-500/50 uppercase tracking-widest text-[9px] font-mono block mb-1">Nota</span>
                        <p className="text-zinc-400 text-sm leading-relaxed">{turn.notes}</p>
                    </div>
                )}

                {turn.cancel_reason ? (
                    <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-4 py-3">
                        <span className="text-red-400/60 uppercase tracking-widest text-[9px] font-mono block mb-1">Motivo cancelación</span>
                        <p className="text-red-300/80 text-sm leading-relaxed">{turn.cancel_reason}</p>
                    </div>
                ) : (
                    <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-4 py-3">
                        <span className="text-red-400/60 uppercase tracking-widest text-[9px] font-mono block mb-1">Cancelado por el usuario</span>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AllAdminTurnCard
