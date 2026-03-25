import turnRepository from "../repository/turn-repository.js";
import serviceRepository from "../repository/services-repository.js";
import mail_transporter from "../config/mailConfig.js";
import userRepository from "../repository/user-repository.js";

class TurnController {
    createTurn = async (req, res) => {
        try {
            const userId = req.user.id;
            const { date, time, service, notes } = req.body;

            if (!date || !time || !service) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }
            
            if (new Date(date) < new Date()) {
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

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_ADMIN,
                subject: "Turno cancelado",
                text: `Hola admin,\n\nEl turno para el servicio "${serviceFoundedById.name}" el día ${cancelledTurn.date_turn} a las ${cancelledTurn.time_turn} ha sido cancelado por el usuario ${userFoundedByEmail.name} ${userFoundedByEmail.surname} (${userFoundedByEmail.email}).`
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

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userFoundedByEmail.email,
                subject: "Turno cancelado por el administrador",
                text: `Hola ${userFoundedByEmail.name},\n\nLamentamos informarte que tu turno para el servicio "${serviceFoundedById.name}" el día ${cancelledTurn.date_turn} a las ${cancelledTurn.time_turn} ha sido cancelado por el administrador por la siguiente razón:\n\n${cancel_reason}\n\nPor favor, ponte en contacto con nosotros si tienes alguna pregunta o deseas reprogramar tu turno.`
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
}

const turnController = new TurnController();
export default turnController;