import type { ServiceCardProps } from "../../types/services.types"

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:shadow-[0_0_24px_rgba(234,179,8,0.12)]">

      <div className="h-1 w-full bg-linear-to-r from-yellow-500 to-yellow-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col gap-3 p-5 flex-1">

        <h2 className="text-white font-serif font-bold text-lg leading-tight group-hover:text-yellow-400 transition-colors duration-200">
          {service.name}
        </h2>

        <p className="text-zinc-400 text-sm leading-relaxed flex-1">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <span className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <i className="bi bi-clock text-yellow-500/70" />
            {service.duration} min
          </span>
          <span className="text-yellow-400 font-bold text-lg font-mono">
            ${service.price}
          </span>
        </div>

      </div>
    </div>
  )
}

export default ServiceCard