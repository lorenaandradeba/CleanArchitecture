import {app, sequelize} from '../express'
import request from "supertest"
describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });
    afterAll(async() => {
        await sequelize.close();
    });

it("should create a product", async() => {
    const response = await request(app)
    .post("/product")
    .send({
        type: "a",
        name:"Roteador",
        price:325,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Roteador");
    expect(response.body.price).toBe(325);
    });


    
    it("should not create a customer", async() => {
        const response = await request(app)
    .post("/product")
    .send({
        name: "Controle",
    });
    expect(response.status).toBe(500);
    });
    
    it("should list all customer", async() => {
        const response = await request(app)
        .post("/product")
        .send({
            type: "a",
            name:"Roteador",
            price:325,
        });
        expect(response.status).toBe(200);

        const response2 = await request(app)
        .post("/product")
        .send({
            type: "a",
            name:"Teclado",
            price:100,
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
       
        expect(listResponse.body.products).toHaveLength(2);
        expect(listResponse.body.products[0].name).toBe("Roteador");
        expect(listResponse.body.products[1].name).toBe("Teclado");

    });

});