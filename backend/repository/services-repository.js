import db from "../config/bd.js";

class ServiceRepository {
    createService = async (name, description, duration, price ) => {
        const query = "INSERT INTO services (name, description, duration, price) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [name, description, duration, price];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    getAllServices = async () => {
        const query = "SELECT id, name, description, duration, price FROM services WHERE active = true ORDER BY name ASC";
        const result = await db.query(query);
        return result.rows;
    }
}

const serviceRepository = new ServiceRepository();
export default serviceRepository; 