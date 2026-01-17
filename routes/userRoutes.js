import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
  updateUser
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// protegidas
router.get("/verifytoken", protect, verifyToken);
router.put("/update", protect, updateUser);

export default router;