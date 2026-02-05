import db from "../config/bd.js";

class UserRepository {
    registerUser = async (name, surname, email, password) => {
        const query = "INSERT INTO users (name, surname, email, password, role) VALUES ($1, $2, $3, $4, 'user') RETURNING *";
        const values = [name, surname, email, password];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    confirmRegistration = async (userId) => {
        const query = "UPDATE users SET is_confirmed = true WHERE id = $1 RETURNING *";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    loginUser = async (email) => {
        const query = "SELECT * FROM users WHERE email = $1 and role = 'user'";
        const values = [email];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    checkConfirmation = async (userId) => {
        const query = "SELECT is_confirmed FROM users WHERE id = $1";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

const userRepository = new UserRepository();
export default userRepository;