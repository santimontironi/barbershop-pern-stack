import db from "../config/bd.js";

class AdminRepository {

    // createAdmin = async (username, passwordHash) => {
    //     const query = "INSERT INTO users (username, password, role) VALUES ($1, $2, 'admin') RETURNING *";
    //     const values = [username, passwordHash];
    //     const result = await db.query(query, values);
    //     return result.rows[0];
    // }

    loginAdmin = async (username) => {
        const query = "SELECT * FROM users WHERE username = $1 and role = 'admin'";
        const values = [username];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

const adminRepository = new AdminRepository();
export default adminRepository;