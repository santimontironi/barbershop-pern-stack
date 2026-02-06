import turnRepository from "../repository/turn-repository.js";

class TurnController {
    myTurns = async (req, res) => {
        try{
            const userId = req.user.id;
            const turns = await turnRepository.userTurns(userId);
            return res.status(200).json({ turns: turns });
        }
        catch(error){
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }
}

const turnController = new TurnController();
export default turnController;