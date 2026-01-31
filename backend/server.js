import app from "./app.js";
import db from "./config/bd.js";

const PORT = process.env.PORT;

export const startServer = async () => {
    try{
        await db.connect();
        console.log("Conexión a la base de datos exitosa.");
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    }
    catch(error){
        console.error("Error al establecer conexion con el servidor:", error);
    }
}