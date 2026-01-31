import adminRepository from "../repository/admin-repository.js";
import bcrypt from "bcryptjs";

class AdminController {

    loginAdmin = async (req, res) => {
        try{
            const { username, password } = req.body;

            const admin = await adminRepository.loginAdmin(username);

            if(!admin){
                return res.status(404).json({ message: "Administrador no encontrado." });
            }

            if(!await bcrypt.compare(password, admin.password)){
                return res.status(401).json({ message: "Contraseña incorrecta." });
            }
            
            return res.status(200).json({ message: "Inicio de sesión exitoso.", admin: { id: admin.id, username: admin.username } });
        }
        catch(error){
            return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
        }
    }
}

const adminController = new AdminController();
export default adminController;