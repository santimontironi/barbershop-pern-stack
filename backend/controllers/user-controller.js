import userRepository from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mail_transporter from "../config/mailConfig.js";

dotenv.config();

class UserController {
    registerUser = async (req, res) => {
        try {
            const { name, surname, photo, email,  password } = req.body;

            const passwordHash = await bcrypt.hash(password, 10);

            const userCreated = await userRepository.registerUser(name, surname, photo, email, passwordHash);

            const token = jwt.sign({ id: userCreated.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            await mail_transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Confirmación de registro.",
                text: `Hola ${name}, ingresa a el siguiente enlace para confirmar tu registro: ${process.env.FRONTEND_URL}/confirm/${token}`
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