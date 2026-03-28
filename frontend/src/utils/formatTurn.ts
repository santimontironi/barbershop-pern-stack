export const formatTime = (timeStr: string): string => {
    const date = new Date(`1970-01-01T${timeStr}`)
    return date.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}

export const formatDateShort = (dateStr: string): string => {
    const cleanDate = dateStr.split("T")[0] // lo que se hace aca es eliminar la parte de la hora que viene en el string original, quedandonos solo con la fecha en formato "YYYY-MM-DD"
    const [year, month, day] = cleanDate.split("-") // luego separamos el string por los guiones para obtener el año, mes y dia por separado
    const date = new Date(Number(year), Number(month) - 1, Number(day)) // creamos un nuevo objeto Date utilizando el año, mes y dia obtenidos. Es importante restar 1 al mes porque en JavaScript los meses van de 0 a 11 (0 = enero, 1 = febrero, ..., 11 = diciembre)
    return date.toLocaleDateString("es-AR", { // finalmente, formateamos la fecha utilizando el método toLocaleDateString para mostrarla en formato corto (ej: "lun 5 jul")
        weekday: "short",
        day: "numeric",
        month: "short"
    })
}

export const formatDateLong = (dateStr: string): string => {
    const cleanDate = dateStr.split("T")[0]
    const [year, month, day] = cleanDate.split("-")
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return date.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    })
}
