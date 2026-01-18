import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Verificamos que venga el header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // 2️⃣ Extraemos el token
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verificamos el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Buscamos el usuario y lo agregamos al request
      req.user = await User.findById(decoded.id).select("-password");

      // 5️⃣ Continuamos a la ruta protegida
      next();
    } catch (error) {
      console.error("Error en protect:", error);
      res.status(401).json({ message: "Token inválido" });
    }
  } else {
    res.status(401).json({ message: "No token, acceso denegado" });
  }
};