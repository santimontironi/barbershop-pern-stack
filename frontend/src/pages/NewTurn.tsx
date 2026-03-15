import useTurns from "../hooks/useTurns"
import { useForm } from "react-hook-form"
import type { NewTurnData } from "../types";
import { useState } from "react";

const NewTurn = () => {

  const { newTurn, loading } = useTurns();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewTurnData>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formSubmit = async (data: NewTurnData) => {
    try {
      await newTurn(data);
      reset();
    }
    catch (error: any) {
      setErrorMessage(error.response?.data?.message);
    }
  }

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div>
            <label htmlFor="date">Fecha:</label>
            <input type="date" id="date" {...register("date", { required: "La fecha es obligatoria" })} />
            {errors.date && <span>{errors.date.message}</span>}
          </div>
          <div>
            <label htmlFor="time">Hora:</label>
            <input type="time" id="time" {...register("time", { required: "La hora es obligatoria" })} />
            {errors.time && <span>{errors.time.message}</span>}
          </div>
          <div>
            <label htmlFor="service">Servicio:</label>
            <select id="service" {...register("service", { required: "El servicio es obligatorio" })}>
              <option value="">Selecciona un servicio</option>
              <option value="1">Corte de cabello</option>
            </select>
            {errors.service && <span>{errors.service.message}</span>}
          </div>
          <div>
            <label htmlFor="notes">Notas (opcional):</label>
            <textarea id="notes" {...register("notes")}></textarea>
          </div>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit" disabled={loading.createTurn}>{loading.createTurn ? "Agendando..." : "Agendar turno"}</button>
        </form>
      </div>
    </section>
  )
}

export default NewTurn