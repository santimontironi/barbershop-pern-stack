import type { AdminTurnProps } from "../../types/turns.types"
import { formatDateShort, formatTime } from "../../utils/formatTurn"
import useTurns from "../../hooks/useTurns"
import Swal from "sweetalert2"

const AdminTurnCard = ({ turn }: AdminTurnProps) => {

  const { cancelTurnByAdmin } = useTurns()

  const handleCancel = async () => {
    const { value: reason, isConfirmed } = await Swal.fire({
      title: "Cancelar turno",
      input: "textarea",
      inputLabel: "Motivo de cancelación",
      inputPlaceholder: "Ingresá el motivo...",
      inputAttributes: { maxlength: "200" },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#374151",
      confirmButtonText: "Cancelar turno",
      cancelButtonText: "Volver",
      background: "#18181b",
      color: "#fff",
    })
    if (isConfirmed) {
      try {
        await cancelTurnByAdmin(turn.id, reason || "")
        Swal.fire({
          icon: "success",
          title: "Turno cancelado",
          text: "El turno fue cancelado exitosamente",
          confirmButtonColor: "#fbbf24",
          background: "#18181b",
          color: "#fff",
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="group relative 2xl:w-100 xl:w-80 w-full flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:shadow-[0_0_24px_rgba(234,179,8,0.12)]">

      <div className="h-1 w-full bg-linear-to-r from-yellow-500 to-yellow-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col gap-5 p-6">

        <div className="flex items-center gap-4">
          <img
            src={turn.user_photo}
            alt={`${turn.user_name} ${turn.user_surname}`}
            className="w-14 h-14 rounded-full object-cover border-2 border-zinc-700 group-hover:border-yellow-500/50 transition-colors duration-300 shrink-0"
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

        <div className="border-t border-zinc-800" />

        <button
          onClick={handleCancel}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-medium tracking-wide transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 w-fit cursor-pointer"
        >
          <i className="bi bi-x-circle text-sm" />
          Cancelar turno
        </button>

      </div>
    </div>
  )
}

export default AdminTurnCard