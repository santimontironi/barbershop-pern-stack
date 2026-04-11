import db from "../config/bd.js";

class UserRepository {
    registerUser = async (name, surname, email, password, phone, photo) => {
        const query = "INSERT INTO users (name, surname, email, password, phone, photo, role) VALUES ($1, $2, $3, $4, $5, $6, 'user') RETURNING *";
        const values = [name, surname, email, password, phone, photo];
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

    getUserById = async (userId) => {
        const query = "SELECT id, name, surname, username, email, phone, photo FROM users WHERE id = $1 AND role = 'user' AND is_confirmed = true";
        const values = [userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    findUserByEmail = async (email) => {
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    updateUser = async (userId, phone, photo) => {
        let query;
        let values;

        if (photo) {
            query = "UPDATE users SET phone = $1, photo = $2 WHERE id = $3 AND role = 'user' AND is_confirmed = true RETURNING id, name, surname, email, phone, photo";
            values = [phone, photo, userId];
        } else {
            query = "UPDATE users SET phone = $1 WHERE id = $2 AND role = 'user' AND is_confirmed = true RETURNING id, name, surname, email, phone, photo";
            values = [phone, userId];
        }

        const result = await db.query(query, values);
        return result.rows[0];
    }
}

const userRepository = new UserRepository();
export default userRepository;