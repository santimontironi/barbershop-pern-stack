import type { AdminTurnProps } from "../../types/turns.types"

const AdminTurnCard = ({ turn }: AdminTurnProps) => {
  return (
    <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:shadow-[0_0_24px_rgba(234,179,8,0.12)]">

      <div className="h-1 w-full bg-linear-to-r from-yellow-500 to-yellow-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col gap-4 p-5">

        <div className="flex items-center gap-3">
          <img
            src={turn.user_photo}
            alt={`${turn.user_name} ${turn.user_surname}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700 group-hover:border-yellow-500/50 transition-colors duration-300 shrink-0"
          />
          <div>
            <p className="text-white font-semibold text-sm leading-tight">
              {turn.user_name} {turn.user_surname}
            </p>
            <p className="flex items-center gap-1.5 text-zinc-400 text-xs mt-0.5">
              <i className="bi bi-telephone text-yellow-500/70" />
              {turn.user_phone}
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800" />

        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-white text-sm font-medium">
            <i className="bi bi-scissors text-yellow-400 text-base" />
            {turn.service_name}
          </p>
          <p className="flex items-center gap-2 text-zinc-400 text-xs">
            <i className="bi bi-calendar-event text-yellow-500/70" />
            {turn.date_turn} — {turn.time_turn}
          </p>
        </div>

        {turn.notes && (
          <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
            <p className="text-zinc-400 text-xs leading-relaxed">
              <span className="text-yellow-500/50 uppercase tracking-widest text-[9px] font-mono block mb-0.5">Nota</span>
              {turn.notes}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminTurnCard