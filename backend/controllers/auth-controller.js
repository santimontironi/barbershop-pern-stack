import adminRepository from "../repository/admin-repository.js";
import userRepository from "../repository/user-repository.js";

export const me = async (req, res) => {
    try {
        const id = req.user.id;
        const role = req.user.role;

        if (role === "admin") {
            const admin = await adminRepository.getAdminById(id);
            return res.status(200).json({ id: admin.id, role: "admin" });
        }

        if (role === "user") {
            const user = await userRepository.getUserById(id);
            return res.status(200).json({ id: user.id, role: "user" });
        }

    } catch (error) {
        return res.status(401).json({ message: "No autorizado", error: error.message });
    }
}