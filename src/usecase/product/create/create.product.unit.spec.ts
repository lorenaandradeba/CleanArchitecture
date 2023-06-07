import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Mouse",
    price: 50,
    
  };

  const MockRepository =() => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      };
  };
  describe("Unit test create product use case", () => {
    it("should create a product", async() =>{
      
      const productRepository = MockRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);
      
      const output = await createProductUseCase.execute(input);
      expect(output).toEqual({
          id: expect.any(String),
          name: input.name,
          price: input.price,
      });
    });
  
  });

  
  it("should thrown an error when product name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });