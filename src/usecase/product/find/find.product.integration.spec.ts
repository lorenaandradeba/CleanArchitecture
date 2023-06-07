import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import { OutputFindProductDto } from "./find.product.dto";

describe("Integration test find product use case", () => {
    let sequelize: Sequelize;
    let productRepository: any;

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
    await sequelize.close()
  })

  it("should find a product", async () => {
    productRepository = new ProductRepository(); 
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Notebook", 5000);

    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output: OutputFindProductDto = {
      id: "123",
      name: "Notebook",
      price: 5000,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});