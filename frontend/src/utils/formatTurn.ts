export const formatTime = (timeStr: string): string => {
    const date = new Date(`1970-01-01T${timeStr}`)
    return date.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}

export const formatDateShort = (dateStr: string): string => {
    const cleanDate = dateStr.split("T")[0]
    const [year, month, day] = cleanDate.split("-")
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return date.toLocaleDateString("es-AR", {
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
