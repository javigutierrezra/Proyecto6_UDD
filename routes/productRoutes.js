import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔓 RUTAS PÚBLICAS
router.get("/readall", getAllProducts);
router.get("/readone/:id", getProductById);

// 🔒 RUTAS PROTEGIDAS
router.post("/create", protect, createProduct);
router.put("/update/:id", protect, updateProduct);
router.delete("/delete/:id", protect, deleteProduct);

export default router;