import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// 🔐 generar token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// 📝 register
export const registerUser = async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.log("🔥 ERROR REAL:", error);
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

// 🔑 login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

// ✅ verificar token
export const verifyToken = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
};

// ✏️ update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};