import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Revisar header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ Si no hay token
    if (!token) {
      return res.status(403).json({ message: "No token, acceso denegado" });
    }

    // 3️⃣ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Buscar usuario
    req.user = await User.findById(decoded.id).select("-password");

    // 5️⃣ Continuar
    next();
  } catch (error) {
    console.error("Error auth middleware:", error);
    res.status(403).json({ message: "Token inválido" });
  }
};