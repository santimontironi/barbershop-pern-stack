import db from "../config/bd.js";

class UserRepository {
    registerUser = async (name, surname, username, photo, email, password) => {
        const query = "INSERT INTO users (name, surname, username, photo, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, 'user') RETURNING *";
        const values = [name, surname, username, photo, email, password];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    confirmRegistration = async (userId) => {
        const query = "UPDATE users SET is_confirmed = true WHERE id = $1 RETURNING *";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    loginUser = async (email,username) => {
        const query = "SELECT * FROM users WHERE (email = $1 or username = $2) and role = 'user'";
        const values = [email, username];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    checkConfirmation = async (userId) => {
        const query = "SELECT is_confirmed FROM users WHERE id = $1";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    getUserById = async (userId) => {
        const query = "SELECT id, name, surname, username, photo, email FROM users WHERE id = $1 and role = 'user'";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

const userRepository = new UserRepository();
export default userRepository;