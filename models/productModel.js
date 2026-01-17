import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Producto vinculado al usuario
}, { timestamps: true });

export default mongoose.model("Product", productSchema);