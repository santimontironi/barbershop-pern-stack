import { Pool } from "../config/bd.js";

class AdminRepository {
    loginAdmin = async (email) => {
        const query = 'SELECT * FROM admins WHERE email = $1';
        const values = [email];
        const result = await Pool.query(query, values);
        return result.rows[0];
    }
}

const adminRepository = new AdminRepository();
export default adminRepository;