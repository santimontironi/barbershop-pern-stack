import type { ScheduleRowProps } from "../../types/ui.types"

const ScheduleRow = ({ day, hours, open, isLast }: ScheduleRowProps) => (
    <div
        className={`flex items-center justify-between px-7 py-4 transition-colors duration-200 ${
            !isLast ? "border-b border-white/8" : ""
        } ${open ? "hover:bg-white/4" : "opacity-50"}`}
    >
        <span className="text-slate-200 font-medium">{day}</span>
        <span className={`font-semibold text-sm tracking-wide ${open ? "text-blue-300" : "text-red-400"}`}>
            {hours}
        </span>
    </div>
)

export default ScheduleRow
