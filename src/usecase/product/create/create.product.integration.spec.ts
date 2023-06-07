import { Sequelize } from "sequelize-typescript";
import ProductInterface from "../../../domain/product/entity/product.interface";
import { InputCreateProductDto } from "./create.product.dto"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import CreateProductUseCase from "./create.product.usecase";

describe("integration test create product use case", () => {

    let input: InputCreateProductDto;
    let productRepository: ProductRepositoryInterface;
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });

    input = {
        type: "a",
        name: "Mouse",
        price: 50,
    };

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();

    productRepository = new ProductRepository();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });
it("should create a product", async() => {
const createProductUseCase = new CreateProductUseCase(productRepository);
const output = await createProductUseCase.execute(input);

expect(output).toEqual({
    id: expect.any(String),
    name: input.name,
    price: input.price,
});


});
})