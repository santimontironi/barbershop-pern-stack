import turnRepository from "../repository/turn-repository.js";

class TurnController {
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