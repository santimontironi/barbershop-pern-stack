import type { ActiveTurnProps } from "../../types/turns.types"
import { Link } from "react-router-dom"
import { formatDateLong, formatTime } from "../../utils/formatTurn"
import useTurns from "../../hooks/useTurns"
import Swal from "sweetalert2"

const ActiveTurn = ({ turn, cancelTurnByUser }: ActiveTurnProps) => {

  const { activeTurn } = useTurns()

  const handleCancelTurnByUser = () => {
    Swal.fire({
      title: "¿Querés cancelar tu turno?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, cancelar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
          cancelTurnByUser()
          Swal.fire(
            "Turno cancelado",
            "Tu turno ha sido cancelado exitosamente",
            "success"
          )
        }
    })
  }

  return (
    <div className="w-full">
      <div className="w-full">

        <h1 className="text-blue-100 font-bold text-[10px] xl:text-xs tracking-widest uppercase mb-5 md:mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          Próximo turno
        </h1>

        {turn ? (
          <div className="bg-blue-900/30 border border-blue-700/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden">

            <div className="h-1 w-full bg-linear-to-r from-red-600 via-red-500 to-blue-500" />

            <div className="px-6 py-6 md:px-8 md:py-7 flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <span className="text-blue-200 text-[12px] font-bold tracking-widest uppercase font-mono">Fecha y hora</span>
                <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-white">
                    <i className="bi bi-calendar3 text-blue-400 text-sm md:text-base" />
                    <span className="font-semibold text-base md:text-lg xl:text-xl capitalize">
                      {formatDateLong(turn.date_turn)}
                    </span>
                  </div>
                  <div className="w-px h-5 bg-blue-600/50" />
                  <div className="flex items-center gap-2 text-white">
                    <i className="bi bi-clock text-blue-400 text-sm md:text-base" />
                    <span className="font-semibold text-base md:text-lg xl:text-xl">
                      {formatTime(turn.time_turn)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-blue-400/90" />

              <div className="flex flex-col gap-1.5">
                <span className="text-blue-200 text-[12px] font-bold tracking-widest">Servicio</span>
                <div className="flex items-center gap-2 text-white">
                  <i className="bi bi-scissors text-red-400 text-sm md:text-base" />
                  <span className="text-sm md:text-base xl:text-lg font-medium">
                    {turn.service_name}
                  </span>
                </div>
              </div>

              {turn.notes && (
                <>
                  <div className="h-px bg-blue-400/90" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-blue-200 font-bold text-[12px] tracking-widest">Nota</span>
                    <div className="flex items-start gap-2 text-blue-300/70">
                      <i className="bi bi-chat-left-text text-blue-500/60 text-sm mt-0.5 shrink-0" />
                      <span className="text-xs md:text-sm italic leading-relaxed">{turn.notes}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="h-px bg-blue-400/90" />

              <button onClick={handleCancelTurnByUser} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-red-500 hover:border-red-500 hover:text-white w-fit cursor-pointer">
                <i className="bi bi-x-circle text-base" />
                <span>Cancelar turno</span>
              </button>

            </div>
          </div>
        ) : (
          <div className="bg-blue-900/20 border border-blue-800/30 rounded-2xl px-8 py-10 flex flex-col items-start gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <i className="bi bi-calendar-x text-red-400/60 text-2xl" />
            <p className="text-red-400 text-base md:text-lg font-bold text-shadow-2xs">No tenés turnos próximos</p>
            <p className="text-white text-xs">Agendá uno cuando quieras</p>
          </div>
        )}

        {activeTurn === null && (
          <div className="mt-5 md:mt-6">
            <Link to="/nuevo-turno" className="flex items-center gap-2 md:gap-2.5 px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white text-sm md:text-base font-medium tracking-wide shadow-[0_4px_14px_rgba(220,38,38,0.35)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.55)] hover:brightness-110 transition-all duration-200 w-fit cursor-pointer">
              <i className="bi bi-plus-circle text-base md:text-lg" />
              <span>Nuevo turno</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default ActiveTurn