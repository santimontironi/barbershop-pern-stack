export const formatDate = (raw) => {
    const d = new Date(raw);
    return d.toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "America/Argentina/Buenos_Aires" });
};

export const formatTime = (raw) => {
    if (!raw) return "";
    const parts = String(raw).split(":");
    return `${parts[0]}:${parts[1]}`;
};

export const isPastDate = (dateStr) => {
    const todayAR = new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }); // "YYYY-MM-DD"
    return dateStr < todayAR;
};
