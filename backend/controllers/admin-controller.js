import adminRepository from "../repository/admin-repository.js";
import bcrypt from "bcryptjs";

class AdminController {
    loginAdmin = async (req, res) => {
        try{
            const { email, password } = req.body;

            const admin = await adminRepository.loginAdmin(email);

            if(!admin){
                return res.status(404).json({ message: "Administrador no encontrado." });
            }

            if(!bcrypt.compareSync(password, admin.password)){
                return res.status(401).json({ message: "Contraseña incorrecta." });
            }
        }
        catch(error){
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }
}

const adminController = new AdminController();
export default adminController;