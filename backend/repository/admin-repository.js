import db from "../config/bd.js";

class AdminRepository {
    
    loginAdmin = async (username) => {
        const query = 'SELECT * FROM admins WHERE username = $1';
        const values = [username];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

const adminRepository = new AdminRepository();
export default adminRepository;