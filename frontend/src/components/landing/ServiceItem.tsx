import type { ServiceItemProps } from "../../types/ui.types"

const ServiceItem = ({ icon, title, desc }: ServiceItemProps) => (
    <div className="group bg-white/4 border border-white/10 rounded-2xl p-7 hover:border-red-500/40 hover:bg-white/6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]">
        <span className="text-3xl mb-5 block">{icon}</span>
        <h3 className="text-white font-semibold text-base mb-2.5 group-hover:text-red-100 transition-colors">
            {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
)

export default ServiceItem
