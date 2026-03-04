import db from "../config/bd.js";

class TurnRepository {
    userTurns = async (userId) => {
        const query = "SELECT t.id, t.date, t.time, t.date_start, t.time_end, t.notes, s.name AS service_name FROM turns t JOIN services s ON t.service_id = s.id WHERE t.fk_user = $1 AND t.state = 'active' ORDER BY t.date DESC, t.time DESC";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows;
    }

    adminTurns = async () => {
        const query = "SELECT t.id, t.date, t.time, t.date_start, t.time_end, t.notes, s.name AS service_name, u.username AS user_name FROM turns t JOIN services s ON t.service_id = s.id JOIN users u ON t.fk_user = u.id WHERE t.state = 'active' ORDER BY t.date DESC, t.time DESC";
        const result = await db.query(query);
        return result.rows;
    }

    createTurn = async (userId, serviceId, dateStart, dateEnd, date, time, notes) => {
        const query = "INSERT INTO turns (fk_user, date_start, time_end, service_id, date, time, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = [userId, dateStart, dateEnd, serviceId, date, time, notes];
        const result = await db.query(query, values);
        return result.rows[0];
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
