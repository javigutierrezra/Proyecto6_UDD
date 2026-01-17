import Product from "../models/productModel.js";

// Crear producto
export const createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = await Product.create({
            name,
            description,
            price,
            user: req.user.id, // usuario que creó el producto
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Leer todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("user", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Leer un producto
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("user", "name email");
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        if (req.body.name) product.name = req.body.name;
        if (req.body.description) product.description = req.body.description;
        if (req.body.price) product.price = req.body.price;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        await product.remove();
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};