 const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

  
    getProducts = async () => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    };

    
    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(p => p.id === Number(id));
    };

  
    addProduct = async (product) => {
        const products = await this.getProducts();

        const newProduct = {
            id: Date.now(),
            ...product
        };

        products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        return newProduct;
    };

   
    updateProduct = async (id, data) => {
        const products = await this.getProducts();

        const index = products.findIndex(p => p.id === Number(id));

        if (index === -1) return null;

        products[index] = {
            ...products[index],
            ...data,
            id: products[index].id 
        };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        return products[index];
    };

    
    deleteProduct = async (id) => {
        const products = await this.getProducts();

        const filtered = products.filter(p => p.id !== Number(id));

        if (filtered.length === products.length) return null;

        await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));

        return true;
    };
}

module.exports = ProductManager;