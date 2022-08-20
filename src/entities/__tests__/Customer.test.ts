import { MikroORM } from "@mikro-orm/core";
import { Customer } from "../Customer";
import { SqlEntityManager } from "@mikro-orm/postgresql";
import { createMikroORM } from "../../index";


describe("Car", () => {
    let orm: MikroORM
    let customer: Customer;
    beforeAll(async () => {
        orm = await createMikroORM(true);
    });
    afterAll(async () => {
        await orm.close(true);
    })
    const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };
    test("create", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        customer = em.create(Customer, testCustomer);
        await em.persistAndFlush(customer);
        customer = await em.findOneOrFail(Customer, { username: customer.username });
        expect(customer).toBeDefined();
        expect(customer!.name).toBe("bilbo baggins");
        expect(customer!.password).toBe("12345");
        expect(customer!.email).toBe("bilbobaggins@shire.com");
        expect(customer!.username).toBe("Bilbo");
        expect(customer!.creditCard).toBe("123456789");
        expect(customer!.age).toBe(150);
    });
    test("update", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const tobeUpdatedCustomer = await em.findOneOrFail(Customer, { username: customer.username });
        expect(tobeUpdatedCustomer!.username).toBe("Bilbo");
        expect(tobeUpdatedCustomer!.password).toBe("123456789");
        tobeUpdatedCustomer!.username = "BilboTheBag";
        await em.persistAndFlush(tobeUpdatedCustomer);
        const newCustomer = await em.findOne(Customer, { id: customer.id });
        expect(newCustomer!.name).toBe("T'Challa");
    })
    test("delete", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const tobeDeletedCustomer = await em.findOne(Customer, { username: customer.username });
        expect(Customer).toBeDefined();
        await em.getRepository(Customer).remove(tobeDeletedCustomer!);
        const newCustomer = await em.findOne(Customer, { username: customer.username });
        expect(newCustomer).toBeNull();
    });
});