import turnRepository from "../repository/turn-repository.js";
import serviceRepository from "../repository/services-repository.js";
import mail_transporter from "../config/mailConfig.js";
import userRepository from "../repository/user-repository.js";
import { formatDate, formatTime, isPastDate } from "../utils/formatTurn.js";

class TurnController {
    createTurn = async (req, res) => {
        try {
            const userId = req.user.id;
            const { date, time, service, notes } = req.body;

            if (!date || !time || !service) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }
            
            if (isPastDate(date)) {
                return res.status(400).json({ message: "Fecha incorrecta. Por favor, elige una fecha futura." });
            }

            if(time < "08:00" || time > "17:00"){
                return res.status(400).json({ message: "Hora incorrecta. Por favor, elige una hora entre las 08:00 y las 18:00." });
            }

            const userHasActiveTurn = await turnRepository.userHasTurn(userId)

            if (userHasActiveTurn) {
                return res.status(400).json({ message: "Ya tienes un turno activo. No puedes crear otro turno hasta que el actual sea cancelado." });
            }

            const invalidDateTime = await turnRepository.invalidDateTimeTurn(date, time);

            if (invalidDateTime) {
                return res.status(400).json({ message: "La fecha y hora seleccionadas ya están ocupadas por otro turno activo. Por favor, elige otra fecha u hora." });
            }

            const newTurn = await turnRepository.createTurn(userId, service, date, time, notes);

            return res.status(201).json({ message: "Turno creado exitosamente.", turn: newTurn });
        }
        catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    getAllUserTurns = async (req, res) => {
        try{
            const userId = req.user.id;
            
            const turns = await turnRepository.userTurns(userId);

            if (!turns || turns.length === 0) {
                return res.status(404).json({ message: "No se encontraron turnos activos." });
            }

            return res.status(200).json({ turns: turns });
        }
        catch(error){
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    userActiveTurn = async (req, res) => {
        try{
            const userId = req.user.id;

            const activeTurn = await turnRepository.userActiveTurn(userId);

            if (!activeTurn) {
                return res.status(404).json({ message: "No tienes turnos activos." });
            }

            return res.status(200).json({ activeTurn: activeTurn });
        }
        catch(error){
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    getAllAdminTurns = async (req, res) => {
        try{
            const turns = await turnRepository.adminTurns();

            if (!turns || turns.length === 0) {
                return res.status(404).json({ message: "No se encontraron turnos activos." });
            }

            return res.status(200).json({ turns: turns });
        }
        catch(error){
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    turnCancelByUser = async (req, res) => {
        try{
            const userId = req.user.id;

            const { turnId } = req.params;

            const cancelledTurn = await turnRepository.cancelTurnByUser(turnId, userId);

            if (!cancelledTurn) {
                return res.status(404).json({ message: "No se encontró el turno o no tienes permiso para cancelarlo." });
            }

            const userFoundedByEmail = await userRepository.getUserById(cancelledTurn.fk_user);
            
            const serviceFoundedById = await serviceRepository.getServiceById(cancelledTurn.fk_service);

            const formattedDate = formatDate(cancelledTurn.date_turn);
            const formattedTime = formatTime(cancelledTurn.time_turn);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_ADMIN,
                subject: "Turno cancelado por el usuario",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px; border-radius: 8px;">
                        <h2 style="color: #d33; margin-bottom: 8px;">Turno cancelado</h2>
                        <p style="color: #555; margin-bottom: 20px;">Un usuario ha cancelado su turno.</p>
                        <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
                            <tr style="background: #f0f0f0;">
                                <td style="padding: 10px 16px; font-weight: bold; color: #333; width: 40%;">Usuario</td>
                                <td style="padding: 10px 16px; color: #555;">${userFoundedByEmail.name} ${userFoundedByEmail.surname} (${userFoundedByEmail.email})</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px; font-weight: bold; color: #333;">Servicio</td>
                                <td style="padding: 10px 16px; color: #555;">${serviceFoundedById.name}</td>
                            </tr>
                            <tr style="background: #f0f0f0;">
                                <td style="padding: 10px 16px; font-weight: bold; color: #333;">Fecha</td>
                                <td style="padding: 10px 16px; color: #555; text-transform: capitalize;">${formattedDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px; font-weight: bold; color: #333;">Hora</td>
                                <td style="padding: 10px 16px; color: #555;">${formattedTime} hs</td>
                            </tr>
                        </table>
                    </div>
                `
            };

            mail_transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error al enviar el correo de cancelación:", error);
                } else {
                    console.log("Correo de cancelación enviado:", info.response);
                }
            });

            return res.status(200).json({ message: "Turno cancelado exitosamente.", turn: cancelledTurn });
        }
        catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    turnCancelByAdmin = async (req, res) => {
        try{
            const { turnId } = req.params;
            
            const { cancel_reason } = req.body;

            if (!cancel_reason) {
                return res.status(400).json({ message: "La razón de cancelación es obligatoria." });
            }

            const cancelledTurn = await turnRepository.cancelTurnByAdmin(turnId, cancel_reason);

            if (!cancelledTurn) {
                return res.status(404).json({ message: "No se encontró el turno." });
            }

            const userFoundedByEmail = await userRepository.getUserById(cancelledTurn.fk_user);
            
            const serviceFoundedById = await serviceRepository.getServiceById(cancelledTurn.fk_service);

            const formattedDate = formatDate(cancelledTurn.date_turn);
            const formattedTime = formatTime(cancelledTurn.time_turn);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userFoundedByEmail.email,
                subject: "Tu turno fue cancelado",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px; border-radius: 8px;">
                        <h2 style="color: #d33; margin-bottom: 8px;">Tu turno fue cancelado</h2>
                        <p style="color: #555; margin-bottom: 20px;">Hola <strong>${userFoundedByEmail.name}</strong>, lamentamos informarte que tu turno fue cancelado por el administrador.</p>
                        <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
                            <tr style="background: #f0f0f0;">
                                <td style="padding: 10px 16px; font-weight: bold; color: #333; width: 40%;">Servicio</td>
                                <td style="padding: 10px 16px; color: #555;">${serviceFoundedById.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px; font-weight: bold; color: #333;">Fecha</td>
                                <td style="padding: 10px 16px; color: #555; text-transform: capitalize;">${formattedDate}</td>
                            </tr>
                            <tr style="background: #f0f0f0;">
                                <td style="padding: 10px 16px; font-weight: bold; color: #333;">Hora</td>
                                <td style="padding: 10px 16px; color: #555;">${formattedTime} hs</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 16px; font-weight: bold; color: #333;">Motivo</td>
                                <td style="padding: 10px 16px; color: #555;">${cancel_reason}</td>
                            </tr>
                        </table>
                        <p style="color: #888; font-size: 13px; margin-top: 24px;">Si tenés alguna consulta, por favor contactanos.</p>
                    </div>
                `
            };

            mail_transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error al enviar el correo de cancelación:", error);
                } else {
                    console.log("Correo de cancelación enviado:", info.response);
                }
            });

            return res.status(200).json({ message: "Turno cancelado exitosamente.", turn: cancelledTurn });
        }
        catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    getAllAdminAllTurns = async (req, res) => {
        try {
            const turns = await turnRepository.adminAllTurns();

            if (!turns || turns.length === 0) {
                return res.status(404).json({ message: "No se encontraron turnos." });
            }

            return res.status(200).json({ turns });
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }

    finishTurn = async (req, res) => {
        try {
            const { turnId } = req.params;

            const finishedTurn = await turnRepository.finishTurn(turnId);

            if (!finishedTurn) {
                return res.status(404).json({ message: "No se encontró el turno o ya no está activo." });
            }

            return res.status(200).json({ message: "Turno finalizado exitosamente.", turn: finishedTurn });
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }
}

const turnController = new TurnController();
export default turnController;