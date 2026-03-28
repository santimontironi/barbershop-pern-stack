import type { UserTurnsCardProps } from "../../types/turns.types"
import { formatDateShort, formatTime } from "../../utils/formatTurn"


const UserTurnsCard = ({ turn }: UserTurnsCardProps) => {

    return (
        <div className="group grid grid-cols-[1fr_0.8fr_1.2fr_1.8fr_1fr] items-center px-5 py-4 transition-colors duration-150 hover:bg-blue-900/30">
            <div className="flex items-center gap-1.5">
                <i className="bi bi-calendar3 text-blue-400/70 text-xs shrink-0" />
                <span className="text-white text-sm capitalize">{formatDateShort(turn.date_turn)}</span>
            </div>

            <div className="flex items-center gap-1.5">
                <i className="bi bi-clock text-blue-400/70 text-xs shrink-0" />
                <span className="text-white text-sm">{formatTime(turn.time_turn)}</span>
            </div>

            <div className="flex items-center gap-1.5 min-w-0">
                <i className="bi bi-scissors text-red-400/80 text-xs shrink-0" />
                <span className="text-slate-200 text-sm truncate">{turn.service_name}</span>
            </div>

            <div className="min-w-0 pr-3">
                {turn.notes && !turn.cancel_reason ? (
                    <span className="text-blue-300/70 text-[11px] italic truncate block">{turn.notes}</span>
                ) : turn.cancel_reason ? (
                    <span className="text-red-400/60 text-[11px] italic truncate block">{turn.cancel_reason}</span>
                ) : (
                    <span className="text-white text-[11px]">—</span>
                )}
            </div>

            <div>
                {turn.state === 'finished' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-950/50 border border-green-800/40 text-green-400 text-[11px] font-medium tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />
                        Realizado
                    </span>
                ) : turn.cancel_reason ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-400 text-[11px] font-medium tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        Cancelado
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-400 text-[11px] font-medium tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        Cancelado
                    </span>
                )}
            </div>
        </div>
    )
}

export default UserTurnsCard