import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import IProduct from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ListProductUseCase from "./list.product.usecase";


describe("Integration test for listing product use case", () => {
  let product1: ProductInterface;
  let product2: ProductInterface;
  let products: ProductFactory[];
  let productRepository: any;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    productRepository = new ProductRepository();

    product1 = new Product("123", "Notebook", 5000);
    product2 = new Product("321","Fone", 350);

    products = [product1, product2];

    const useCase = new ListProductUseCase(productRepository);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await useCase.execute(undefined);

    expect(output.products.length).toBe(products.length);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});