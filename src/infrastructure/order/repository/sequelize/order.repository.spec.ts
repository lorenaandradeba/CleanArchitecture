import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
     CustomerModel, 
     OrderModel, 
     OrderItemModel,
     ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () =>{
    const customerRepository = new CustomerRepository();
    const customer = new Customer("23", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2);

      const order = new Order("123", "23", [ordemItem]);
      
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderModel = await OrderModel.findOne({
        where: { id: order.id},
        include: ["items"],
      });

      expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id:"23",
        total: order.total(),
        items: [
          {
            id: ordemItem.id,
            name: ordemItem.name,
            price: ordemItem.price,
            quantity: ordemItem.quantity,
            order_id: "123",
            product_id:"123",
          },
        ],
      });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("23", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2);

      const order = new Order("123", "23", [ordemItem]);
      
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderResult = await orderRepository.find(order.id);
      
      expect(order).toStrictEqual(orderResult);

      const customer2 = new Customer("123", "Customer 2");
      const address2 = new Address("Rua da Batatinha", 2, "cep 2", "City 2");
      customer2.changeAddress(address2);
      await customerRepository.create(customer2);
      order.changeCustomer("123")

     await orderRepository.update(order);

    const orderResult2 = await orderRepository.find(order.id);
      
    expect(order).toStrictEqual(orderResult2);
  });

  
  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("23", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2);

      const order = new Order("123", "23", [ordemItem]);
      
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);


      const orderResult = await orderRepository.find(order.id);
      
      expect(order).toStrictEqual(orderResult);
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("568AS");
    }).rejects.toThrow("Order not found");
  });

  
  it("should find all orders", async () => {

  });
});
