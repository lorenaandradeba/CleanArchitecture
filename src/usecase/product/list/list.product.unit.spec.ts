import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for listing product use case", () => {
  let product1: ProductInterface;
  let product2: ProductInterface;
  let products: ProductFactory[];
  let productRepository: any;

  beforeEach(() => {
    product1 = ProductFactory.create("a", "colher", 2);
    product2 = ProductFactory.create("b", "faca", 25);
    products = [product1, product2];

    productRepository = {
      create: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
      findById: jest.fn(),
      update: jest.fn(),
    };
  });

  it("should list a product", async () => {
    const useCase = new ListProductUseCase(productRepository);

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