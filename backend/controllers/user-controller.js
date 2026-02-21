import userRepository from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mail_transporter from "../config/mailConfig.js";

dotenv.config();

class UserController {
    registerUser = async (req, res) => {
        try {
            const { name, surname, username, email, password, phone } = req.body;

            const passwordHash = await bcrypt.hash(password, 10);

            const userCreated = await userRepository.registerUser(name, surname, username, email, passwordHash, phone);

            const token = jwt.sign({ id: userCreated.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            await mail_transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Confirmación de registro.",
                text: `Hola ${name}, ingresa a el siguiente enlace para confirmar tu registro: ${process.env.FRONTEND_URL}/confirmar/${token}`
            });

            return res.status(201).json({ message: "Usuario registrado exitosamente.", user: { id: userCreated.id } });
        }
        catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    confirmRegistration = async (req, res) => {
        try {
            const { token } = req.params;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            const userConfirmed = await userRepository.confirmRegistration(userId);

            if (!userConfirmed) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }

            return res.status(200).json({ message: "Registro confirmado exitosamente." });
        }
        catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    loginUser = async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const user = await userRepository.loginUser(email, username);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Contraseña incorrecta." });
            }

            const isConfirmed = await userRepository.checkConfirmation(user.id);

            if (!isConfirmed.is_confirmed) {
                return res.status(403).json({ message: "Registro no confirmado. Por favor, confirma tu registro antes de iniciar sesión." });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });

            res.cookie("token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            });

            return res.status(200).json({ message: "Inicio de sesión exitoso.", user: { id: user.id, role: user.role } });
        }
        catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    dashboardUser = async (req, res) => {
        try {
            const userId = req.user.id;

            if (!userId) {
                return res.status(401).json({ message: "No autorizado." });
            }

            const user = await userRepository.getUserById(userId);
            return res.status(200).json({ user: { id: user.id, role: user.role, name: user.name, surname: user.surname, username: user.username, photo: user.photo, email: user.email } });
        }
        catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    logoutUser = (req, res) => {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        return res.status(200).json({ message: "Cierre de sesión exitoso." });
    }
}

const userController = new UserController();
export default userController;