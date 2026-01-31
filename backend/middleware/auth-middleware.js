import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ authorized: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ authorized: false });
    }
}