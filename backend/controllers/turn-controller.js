import turnRepository from "../repository/turn-repository.js";

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

            if(time < "08:00" || time > "18:00"){
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

    userNextTurn = async (req, res) => {
        try{
            const userId = req.user.id;

            const nextTurn = await turnRepository.userNextTurn(userId);

            if (!nextTurn) {
                return res.status(404).json({ message: "No tienes turnos activos." });
            }

            return res.status(200).json({ nextTurn: nextTurn });
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
}

const turnController = new TurnController();
export default turnController;