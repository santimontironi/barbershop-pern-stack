import type { TurnsUser } from "../../types/turns.types"
import { formatDateShort, formatTime } from "../../utils/formatTurn"

interface UserTurnsCardProps {
    turn: TurnsUser
}

const UserTurnsCard = ({ turn }: UserTurnsCardProps) => {
    const isCancelled = turn.cancel_reason !== null

    return (
        <div className={`group flex flex-col rounded-xl overflow-hidden transition-all duration-200 border ${isCancelled ? "bg-red-950/10 border-red-900/30 hover:border-red-700/40" : "bg-blue-900/20 border-blue-800/30 hover:border-blue-700/40"}`}>
            <div className={`h-0.5 w-full ${isCancelled ? "bg-linear-to-r from-red-700 to-red-500" : "bg-linear-to-r from-blue-700 to-blue-400"}`} />

            <div className="flex flex-col gap-3 px-5 py-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <i className="bi bi-calendar3 text-blue-400 text-xs" />
                        <span className="text-white text-sm font-medium capitalize">{formatDateShort(turn.date_turn)}</span>
                    </div>
                    <span className="text-blue-700/60 text-xs">|</span>
                    <div className="flex items-center gap-1.5">
                        <i className="bi bi-clock text-blue-400 text-xs" />
                        <span className="text-white text-sm font-medium">{formatTime(turn.time_turn)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <i className="bi bi-scissors text-red-400 text-xs" />
                    <span className="text-slate-300 text-sm">{turn.service_name}</span>
                </div>

                {isCancelled && (
                    <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-3 py-2">
                        <span className="text-red-400/60 text-[10px] font-mono uppercase tracking-widest block mb-0.5">Cancelado</span>
                        <p className="text-red-300/80 text-xs leading-relaxed">{turn.cancel_reason}</p>
                    </div>
                )}

                {turn.notes && !isCancelled && (
                    <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg px-3 py-2">
                        <span className="text-blue-400/50 text-[10px] font-mono uppercase tracking-widest block mb-0.5">Nota</span>
                        <p className="text-blue-200/70 text-xs leading-relaxed italic">{turn.notes}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserTurnsCard