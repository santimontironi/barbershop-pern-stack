import type { TurnsHistoryTableProps } from "../../types/turns.types"
import UserTurnsCard from "./UserTurnsCard"

const TurnsHistoryTable = ({ turns }: TurnsHistoryTableProps) => {
    if (turns.length === 0) return (
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-2xl px-8 py-8 flex flex-col items-start gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <i className="bi bi-clock-history text-blue-400/40 text-2xl" />
            <p className="text-slate-300 text-base font-medium">Sin historial de turnos</p>
            <p className="text-slate-500 text-xs">Tus turnos pasados aparecerán aquí</p>
        </div>
    )

    return (
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-sm">
            <div className="grid grid-cols-[1fr_0.8fr_1.2fr_1.8fr_1fr] px-5 py-3 border-b border-blue-800/40 bg-blue-950/40">
                <span className="text-white font-bold text-[10px] tracking-widest uppercase">Fecha</span>
                <span className="text-white font-bold text-[10px] tracking-widest uppercase">Hora</span>
                <span className="text-white font-bold text-[10px] tracking-widest uppercase">Servicio</span>
                <span className="text-white font-bold text-[10px] tracking-widest uppercase">Nota</span>
                <span className="text-white font-bold text-[10px] tracking-widest uppercase">Estado</span>
            </div>
            {turns.map((turn) => (
                <UserTurnsCard key={turn.id} turn={turn} />
            ))}
        </div>
    )
}

export default TurnsHistoryTable
