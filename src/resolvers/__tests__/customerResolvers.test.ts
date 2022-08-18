import {MikroORM} from "@mikro-orm/core";
import {Customer} from "../../entities/Customer";
import {SqlEntityManager} from "@mikro-orm/postgresql";
import {ApolloServer} from "apollo-server-express";
import {createApolloServer, createMikroORM} from "../../index";

describe("users", () => {
    let orm: MikroORM
    beforeAll(async () => {
        orm = await createMikroORM(true);
    });
    afterAll(async () => {
        await orm.close(true);
    })
    const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };
    test("create", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        let customer = em.create(Customer, testCustomer);
        await em.persistAndFlush(customer);
        customer = await em.findOneOrFail(Customer, { username: "Biblo" });
        expect(customer).toBeDefined();
        expect(customer!.username).toBe("Biblo");
        expect(customer!.password).toBe("12345");
        expect(customer!.email).toBe("bilbobaggins@shire.com");
        expect(customer!.creditCard).toBe("123456789");
        expect(customer!.age).toBe(150);
    });
    test("update", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const customer = await em.findOneOrFail(Customer, { username: "Biblo" });
        expect(customer!.creditCard).toBe("123456789");
        expect(customer!.age).toBe(150);
        customer!.creditCard = "987654321";
        customer!.age = 100;
        await em.persistAndFlush(customer);
        const customer_new = await em.findOne(Customer, { username: "Biblo" });
        expect(customer_new!.creditCard).toBe("987654321");
        expect(customer_new!.age).toBe(100);
    })
    test("delete", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const customer = await em.findOne(Customer, { username: "Biblo" });
        expect(customer).toBeDefined();
        await em.getRepository(Customer).remove(customer!);
        const customer_new = await em.findOne(Customer, { username: "Biblo" });
        expect(customer_new).toBeNull();
    });
});

describe("resolvers", () => {
    const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };
    let customerId: number;
    let testServer: ApolloServer;
    beforeAll(async () => {
        testServer = await createApolloServer(true);
    });
    afterAll(async () => {
        await testServer.stop();
    });
    it('creates customer', async () => {
        const result = await testServer.executeOperation({
            query: `mutation register($name: String!, $password: String!, $email: String!, $username: String!, $creditCard: String!, $age: Float!) {
             register(name: $name, password: $password, email: $email, username: $username, creditCard: $creditCard, age: $age) 
             }`,
            variables: testCustomer,
        });
        expect(result.errors).toBeUndefined();
        expect(typeof result?.data?.register).toBe('number');
        customerId = result?.data?.register;
    });

    it('deletes customer', async () => {
        const result = await testServer.executeOperation({
            query: `mutation deleteCustomer($id: Float!) {
             deleteCustomer(id: $id) 
             }`,
            variables: { id:  customerId },
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.deleteCustomer).toBe(true);
    });
})