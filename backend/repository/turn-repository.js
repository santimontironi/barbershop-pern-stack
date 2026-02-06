import db from "../config/bd.js";

class TurnRepository {
    userTurns = async (userId) => {
        const query = "SELECT t.id, t.date, t.time, s.name AS service_name FROM turns t JOIN services s ON t.service_id = s.id WHERE t.user_id = $1 ORDER BY t.date DESC, t.time DESC";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows;
    }
}

const turnRepository = new TurnRepository();
export default turnRepository;
