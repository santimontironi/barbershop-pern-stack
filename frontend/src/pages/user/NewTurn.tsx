import useTurns from "../../hooks/useTurns"
import useServices from "../../hooks/useServices";
import { useForm, Controller } from "react-hook-form"
import type { NewTurnData } from "../../types/turns.types";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const NewTurn = () => {

  const { newTurn, loading } = useTurns();
  const { services, fetchServices } = useServices();

  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [])

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<NewTurnData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const today = new Date(); // Obtiene la fecha actual
  today.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha

  // Función para deshabilitar domingos y lunes
  const filterDate = (date: Date) => {
    const day = date.getDay(); // Obtiene el día de la semana
    return day !== 0 && day !== 1; // deshabilita domingo (0) y lunes (1)
  };

  const formSubmit = async (data: NewTurnData) => {
    try {
      await newTurn(data);
      Swal.fire({
        icon: "success",
        title: "Turno creado",
        text: "El turno se ha creado exitosamente",
        confirmButtonColor: "#fbbf24",
      })
      navigate("/panel-usuario")
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message);
      reset();
    }
  }

  return (
    <section className="min-h-screen bg-blue-950 flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg">

        <div className="text-center mb-10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 mx-auto mb-4">
            <i className="bi bi-calendar-plus text-red-400 text-2xl" />
          </div>
          <span className="block text-blue-300/50 text-xs tracking-widest mb-1">Panel de usuario</span>
          <h1 className="text-white font-bold text-3xl md:text-4xl">
            Agendar <span className="text-red-400">Turno</span>
          </h1>
          <div className="mt-3 w-12 h-0.5 bg-red-500 rounded-full mx-auto" />
        </div>

        <div className="bg-blue-900/20 border border-blue-800/40 rounded-3xl p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="date" className="block text-blue-200/70 text-xs tracking-widest mb-2">
                  <i className="bi bi-calendar3 text-red-400 mr-1.5" />Fecha
                </label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "La fecha es obligatoria" }}
                  render={({ field }) => (
                    <DatePicker
                      id="date"
                      selected={field.value ? new Date(field.value + "T00:00:00") : null} // Convertir la fecha en un objeto Date
                      onChange={(date: Date | null) => field.onChange(date ? date.toISOString().split("T")[0] : "")} // Convertir de nuevo a string en formato YYYY-MM-DD
                      filterDate={filterDate} // Función para deshabilitar domingos y lunes
                      minDate={new Date(today.getTime() + 86400000)} // Deshabilitar fechas anteriores a hoy
                      dateFormat="dd/MM/yyyy" // Formato de la fecha
                      placeholderText="Seleccioná una fecha"
                      locale="es" // Establecer el idioma a español
                      className="w-full bg-blue-950/40 border border-blue-800/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
                      calendarClassName="custom-datepicker"
                      autoComplete="off"
                    />
                  )}
                />
                {errors.date && <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><i className="bi bi-exclamation-circle" />{errors.date.message}</span>}
              </div>

              <div>
                <label htmlFor="time" className="block text-blue-200/70 text-xs tracking-widest mb-2">
                  <i className="bi bi-clock text-red-400 mr-1.5" />Hora
                </label>
                <select id="time" className="w-full bg-blue-950/40 border border-blue-800/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 cursor-pointer scheme-dark" {...register("time", { required: "La hora es obligatoria" })}>
                  <option value="" className="bg-blue-950 text-blue-300/50">Seleccioná un horario</option>
                  <option value="08:00" className="bg-blue-950 text-white">08:00</option>
                  <option value="08:30" className="bg-blue-950 text-white">08:30</option>
                  <option value="09:00" className="bg-blue-950 text-white">09:00</option>
                  <option value="09:30" className="bg-blue-950 text-white">09:30</option>
                  <option value="10:00" className="bg-blue-950 text-white">10:00</option>
                  <option value="10:30" className="bg-blue-950 text-white">10:30</option>
                  <option value="11:00" className="bg-blue-950 text-white">11:00</option>
                  <option value="11:30" className="bg-blue-950 text-white">11:30</option>
                  <option value="12:00" className="bg-blue-950 text-white">12:00</option>
                  <option value="12:30" className="bg-blue-950 text-white">12:30</option>
                  <option value="13:00" className="bg-blue-950 text-white">13:00</option>
                  <option value="13:30" className="bg-blue-950 text-white">13:30</option>
                  <option value="14:00" className="bg-blue-950 text-white">14:00</option>
                  <option value="14:30" className="bg-blue-950 text-white">14:30</option>
                  <option value="15:00" className="bg-blue-950 text-white">15:00</option>
                  <option value="15:30" className="bg-blue-950 text-white">15:30</option>
                  <option value="16:00" className="bg-blue-950 text-white">16:00</option>
                  <option value="16:30" className="bg-blue-950 text-white">16:30</option>
                  <option value="17:00" className="bg-blue-950 text-white">17:00</option>
                </select>
                {errors.time && <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><i className="bi bi-exclamation-circle" />{errors.time.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-blue-200/70 text-xs tracking-widest mb-2">
                <i className="bi bi-scissors text-red-400 mr-1.5" />Servicio
              </label>
              <select id="service" className="w-full bg-blue-950/40 border border-blue-800/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 cursor-pointer scheme-dark" {...register("service", { required: "El servicio es obligatorio" })}>
                <option value="" className="bg-blue-950 text-blue-300/50">Selecciona un servicio</option>
                {services.map(service => (
                  <option key={service.id} value={service.id} className="bg-blue-950 text-white">{service.name} (${service.price} - duración de: {service.duration <= 1 ? `${service.duration} hora` : `${service.duration} horas`})</option>
                ))}
              </select>
              {errors.service && <span className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><i className="bi bi-exclamation-circle" />{errors.service.message}</span>}
            </div>

            <div>
              <label htmlFor="notes" className="block text-blue-200/70 text-xs tracking-widest uppercase font-mono mb-2">
                <i className="bi bi-pencil text-red-400 mr-1.5" />Notas <span className="text-blue-400/40 normal-case tracking-normal font-sans">(opcional)</span>
              </label>
              <textarea id="notes" rows={3} placeholder="Alguna indicación especial..." className="w-full bg-blue-950/40 border border-blue-800/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 resize-none placeholder:text-blue-300/30 scheme-dark" {...register("notes")} />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                <i className="bi bi-exclamation-triangle text-red-400 text-base shrink-0" />
                <p className="text-red-300 text-sm">{errorMessage}</p>
              </div>
            )}

            <button type="submit" disabled={loading.createTurn} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white font-semibold text-sm tracking-wide shadow-[0_4px_14px_rgba(220,38,38,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_4px_20px_rgba(220,38,38,0.55)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              {loading.createTurn ? (
                <>
                  <i className="bi bi-arrow-repeat animate-spin text-base" />
                  <span>Agendando...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-calendar-check text-base" />
                  <span>Agendar turno</span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}

export default NewTurn