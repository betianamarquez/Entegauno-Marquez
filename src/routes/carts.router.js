const { Router } = require("express");
const CartManager = require("../managers/CartManager");

const router = Router();

const manager = new CartManager("./src/data/carts.json");

// Crear carrito
router.post("/", async (req, res) => {

    const cart = await manager.createCart();

    res.status(201).json(cart);
});

// Obtener carrito por ID
router.get("/:cid", async (req, res) => {

    const id = Number(req.params.cid); // ✅ FIX AQUÍ

    const cart = await manager.getCartById(id);

    if (!cart) {
        return res.status(404).json({
            error: "Carrito no encontrado"
        });
    }

    res.json(cart);
});

// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {

  const cartId = Number(req.params.cid);
const productId = Number(req.params.pid);

    const cart = await manager.addProductToCart(
        cartId,
        productId
    );

    if (!cart) {
        return res.status(404).json({
            error: "Carrito no encontrado"
        });
    }

    res.json(cart);
});

module.exports = router;