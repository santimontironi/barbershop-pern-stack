import type { NextTurnProps } from "../../types"
import NewTurnBtn from "../ui/NewTurnBtn"

const NextTurn = ({ turn }: NextTurnProps) => {

  return (
    <div className="px-5 md:px-8 xl:px-30 2xl:px-60 mt-10 md:mt-14 xl:mt-16">

      <div className="w-fit">
        <h1 className="text-blue-100 font-bold text-[10px] xl:text-xs 2xl:text-[30px] tracking-widest uppercase mb-3 md:mb-4">
          Próximo turno
        </h1>

        {turn ? (
          <div className="flex flex-col gap-3 md:gap-4">

            <div className="flex items-center gap-4 md:gap-5">
              <div className="flex items-center gap-2 text-white">
                <i className="bi bi-calendar3 text-blue-400 text-sm md:text-base xl:text-lg" />
                <span className="font-semibold text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
                  {turn?.date_turn}
                </span>
              </div>
              <div className="w-21 h-6 md:h-7 bg-blue-700" />
              <div className="flex items-center gap-2 text-white">
                <i className="bi bi-clock text-blue-400 text-sm md:text-base xl:text-lg" />
                <span className="font-semibold text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
                  {turn?.time_turn}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-200/80">
              <i className="bi bi-scissors text-blue-400 text-sm md:text-base" />
              <span className="text-sm md:text-base xl:text-lg font-medium">
                {turn?.service_name}
              </span>
            </div>

            {turn?.notes && (
              <div className="flex items-start gap-2 text-blue-300/60 max-w-xs md:max-w-sm xl:max-w-md">
                <i className="bi bi-chat-left-text text-blue-500/70 text-sm md:text-base mt-0.5 shrink-0" />
                <span className="text-xs md:text-sm xl:text-base italic leading-relaxed">
                  {turn?.notes}
                </span>
              </div>
            )}

          </div>
        ) : (
          <p className="text-red-500 text-base md:text-lg xl:text-xl font-medium">
            No tenés turnos próximos
          </p>
        )}

        <div className="mt-4 md:mt-5 h-px w-full bg-white/60" />

        <div className="mt-5 md:mt-6">
          <NewTurnBtn />
        </div>
      </div>

    </div>
  )
}

export default NextTurn 