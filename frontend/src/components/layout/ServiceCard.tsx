import type { ServiceCardProps } from "../../types/services.types"

const ServiceCard = ({ service, onDelete }: ServiceCardProps) => {
  return (
    <div className="group relative flex flex-col bg-linear-to-br from-zinc-800/90 to-zinc-900 border border-zinc-700/80 rounded-3xl overflow-hidden transition-all duration-500 hover:border-yellow-500/60 hover:shadow-[0_8px_48px_rgba(234,179,8,0.18)] hover:-translate-y-1.5 shadow-[0_2px_16px_rgba(0,0,0,0.6)]">

      <div className="h-0.5 w-full bg-linear-to-r from-yellow-600/60 via-yellow-400 to-yellow-600/60 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <button
        onClick={onDelete}
        className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-zinc-700/80 text-zinc-400 hover:bg-red-500/25 hover:text-red-400 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
        aria-label="Eliminar servicio"
      >
        <i className="bi bi-trash text-xs" />
      </button>

      <div className="flex flex-col gap-4 p-6 flex-1 relative">

        <div className="flex items-start gap-3 pr-8">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 shadow-[0_0_6px_rgba(234,179,8,0.7)]" />
          <h2 className="text-zinc-100 font-semibold text-base leading-snug tracking-tight group-hover:text-white transition-colors duration-300">
            {service.name}
          </h2>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed flex-1 pl-4.5">
          {service.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-700/60 mt-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-700/60 text-zinc-300 text-xs font-medium">
            <i className="bi bi-clock text-yellow-400/90 text-[11px]" />
            {service.duration === 1
              ? `${service.duration} hora`
              : `${service.duration} horas`}
          </span>

          <div className="flex items-baseline gap-0.5">
            <span className="text-zinc-400 text-xs mb-0.5">$</span>
            <span className="text-yellow-400 font-bold text-xl leading-none tracking-tight tabular-nums drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
              {service.price}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServiceCard