import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from "./update.product.dto";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { Sequelize } from "sequelize-typescript";

   
describe("Unit test for product update use case", () => {
    let input: InputUpdateProductDto;
    let productRepository: ProductRepositoryInterface;
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

    it("should update a product", async () => {
       productRepository = new ProductRepository();

       const productUpdateUseCase = new UpdateProductUseCase(productRepository);
  
       const product = ProductFactory.create("a", "xicara", 12);
       
       productRepository.create(product);
  
        const input = {
            id: product.id,
            name: "xícara decorada",
            price: product.price
        };

        const output = await productUpdateUseCase.execute(input);
  
        expect(output).toEqual(input);
    });
  });