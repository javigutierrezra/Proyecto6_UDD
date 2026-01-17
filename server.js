import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rutas (⚠️ NADA de protect aquí)
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Conexión DB + servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Servidor corriendo en puerto", process.env.PORT || 5000);
    });
  })
  .catch((error) => {
    console.error("Error MongoDB:", error);
  });