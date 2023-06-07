import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import { OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";



describe("unit test find a product use case", () =>{
  let product: ProductInterface;
  let productRepository: any;

  beforeEach(() => {
    product = new Product("123","Notebook", 5000);

    productRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  });

  it("should find a product", async () => {
    const usecase = new FindProductUseCase(productRepository);

  await productRepository.create(product);

  const input = {
    id: "123",
  };
  const output: OutputFindProductDto = {
    id:"123",
    name: "Notebook",
    price: 5000,
  };

  const result = await usecase.execute(input);

  expect(result).toEqual(output);
});
it("should not find a customer", async () => {
  productRepository.find.mockImplementation(() => {
    throw new Error("Product not found");
  });

  const usecase = new FindProductUseCase(productRepository);

  await productRepository.create(product);

  const input = {
    id: "123",
  };

  expect(() => {
    return usecase.execute(input);
  }).rejects.toThrow("Product not found");
});
});