export const me = (req, res) => {
    try {
        const { id, role } = req.user;
        return res.status(200).json({ user: { id, role } });
    } catch (error) {
        return res.status(401).json({ message: "No autorizado", error: error.message });
    }
};