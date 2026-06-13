const fs = require("fs");

class CartManager {

    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async createCart() {

        const carts = await this.getCarts();

        const newCart = {
            id: Date.now(),
            products: []
        };

        carts.push(newCart);

        await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        );

        return newCart;
    }

    async getCartById(id) {

        const carts = await this.getCarts();

        return carts.find(cart => cart.id == id);
    }

    async addProductToCart(cartId, productId) {

        const carts = await this.getCarts();

        const cart = carts.find(c => c.id == cartId);

        if (!cart) {
            return null;
        }

        const productInCart = cart.products.find(
            p => p.product == productId
        );

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        );

        return cart;
    }
}

module.exports = CartManager;