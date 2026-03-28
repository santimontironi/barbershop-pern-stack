import ScheduleRow from "../ScheduleRow"

const ScheduleSection = () => {
    return (
        <div className="bg-linear-to-br from-slate-800 to-slate-900 py-28 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-10 pointer-events-none" />

            <div className="relative container mx-auto max-w-2xl">
                <div className="text-center mb-14">
                    <span className="text-blue-400/50 text-xs tracking-widest uppercase font-mono block mb-3">¿Cuándo?</span>
                    <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight">
                        Horarios de <span className="text-blue-400">Atención</span>
                    </h2>
                    <div className="mt-5 w-16 h-0.5 bg-blue-500 rounded-full mx-auto" />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <ScheduleRow day="Lunes"     hours="Cerrado"       open={false}  isLast={false} />
                    <ScheduleRow day="Martes"    hours="08:00 — 17:00" open={true}  isLast={false} />
                    <ScheduleRow day="Miércoles" hours="08:00 — 17:00" open={true}  isLast={false} />
                    <ScheduleRow day="Jueves"    hours="08:00 — 17:00" open={true}  isLast={false} />
                    <ScheduleRow day="Viernes"   hours="08:00 — 17:00" open={true}  isLast={false} />
                    <ScheduleRow day="Sábado"    hours="08:00 — 17:00" open={true}  isLast={false} />
                    <ScheduleRow day="Domingo"   hours="Cerrado"       open={false} isLast={true}  />
                </div>
            </div>
        </div>
    )
}

export default ScheduleSection
