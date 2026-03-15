import { useContext } from "react";
import { TurnContext } from "../context/TurnContext";

const useTurns = () => {

    const context = useContext(TurnContext);

    if (!context) {
        throw new Error("useTurns must be used within a TurnProvider");
    }

    return context
    
}

export default useTurns