import db from "../config/bd.js";

class TurnRepository {
    userTurns = async (userId) => {
        const query = "SELECT t.id, t.date_turn, t.time_turn, t.notes, s.name AS service_name FROM turns t JOIN services s ON t.fk_service = s.id WHERE t.fk_user = $1 AND t.state != 'active' ORDER BY t.date_turn DESC, t.time_turn DESC";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows; //result.rows devuelve un array con los turnos del usuario, cada turno es un objeto con las propiedades id, date_turn, time_turn, notes y service_name
    }

    userHasTurn = async (userId) => {
        const query = "SELECT * FROM turns WHERE fk_user = $1 AND state = 'active' LIMIT 1";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows.length > 0;  // Devuelve true si el usuario tiene un turno activo, false en caso contrario 
    }

    userNextTurn = async (userId) => {
        const query = "SELECT t.id, t.date_turn, t.time_turn, t.notes, s.name AS service_name FROM turns t JOIN services s ON t.fk_service = s.id WHERE t.fk_user = $1 AND t.state = 'active' ORDER BY t.date_turn ASC, t.time_turn ASC LIMIT 1";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0]; //el [0] devuelve el primer turno del array, que es el próximo turno del usuario en formato de objeto
    }

    adminTurns = async () => {
        const query = "SELECT t.id, t.date_turn, t.time_turn, t.notes, s.name AS service_name, u.name AS user_name, u.surname as user_surname, u.phone as user_phone, u.photo as user_photo FROM turns t JOIN services s ON t.fk_service = s.id JOIN users u ON t.fk_user = u.id WHERE t.state = 'active' ORDER BY t.date_turn DESC, t.time_turn DESC";
        const result = await db.query(query);
        return result.rows;
    }

    createTurn = async (userId, serviceId, dateTurn, timeTurn, notes) => {
        const query = "INSERT INTO turns (fk_user, fk_service, date_turn, time_turn, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *"; //returning * devuelve el turno recién insertado
        const values = [userId, serviceId, dateTurn, timeTurn, notes];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    invalidDateTimeTurn = async (dateTurn, timeTurn) => {
        const query = "SELECT * FROM turns WHERE date_turn = $1 AND time_turn = $2 AND state = 'active'";
        const values = [dateTurn, timeTurn];
        const result = await db.query(query, values);
        return result.rows.length > 0;
    }

    cancelTurnByUser = async (turnId, userId) => {
        const query = "UPDATE turns SET state = 'cancelled' WHERE fk_user = $1 AND id = $2 RETURNING *";
        const values = [userId, turnId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    cancelTurnByAdmin = async (turnId) => {
        const query = "UPDATE turns SET state = 'cancelled' WHERE id = $1 RETURNING *";
        const values = [turnId];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

const turnRepository = new TurnRepository();
export default turnRepository;
