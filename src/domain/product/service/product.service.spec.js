import Product from "../entity/product";
import ProductService from "./product.service";
describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        const product1 = new Product("product1", "Product 1", 10);
        const product3 = new Product("product3", "Product 3", 30);

        const products = [product1, product3];

        ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product3.price).toBe(60);


    });
});