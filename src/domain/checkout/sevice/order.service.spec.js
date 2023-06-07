import Order from "../entity/order";
import Customer from "../../customer/entity/customer";
import OrdemItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        
        const item1 = new OrdemItem("i1", "Item 1", 10, "p1", 1);
        const item2 = new OrdemItem("i2", "Item 2", 20, "p1", 1);
        const order = OrderService.placeOrder(customer, [item1, item2]);

        expect(customer.rewardPoints).toBe(15)
        expect(order.total()).toBe(30);

    });
it ("should get total of all orders", () => {

    const item1 = new OrdemItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrdemItem("i2", "Item 2", 200, "p2", 2);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);
    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500)
    
});

it ("should add reward points", () => {
const customer = new Customer("1", "Customer 1");

expect(customer.rewardPoints).toBe(0);

customer.addRewardPoints(10);

expect(customer.rewardPoints).toBe(10);

customer.addRewardPoints(10);

expect(customer.rewardPoints).toBe(20);


});

});