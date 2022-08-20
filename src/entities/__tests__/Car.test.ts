import { MikroORM } from "@mikro-orm/core";
import { Car } from "../Car";
import { SqlEntityManager } from "@mikro-orm/postgresql";
import { createMikroORM } from "../../index";


describe("Car", () => {
    let orm: MikroORM
    let car: Car;
    beforeAll(async () => {
        orm = await createMikroORM(true);
    });
    afterAll(async () => {
        await orm.close(true);
    })
    const testCar = { model: "Ford", available: true };
    test("create", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        car = em.create(Car, testCar);
        await em.persistAndFlush(car);
        car = await em.findOneOrFail(Car, { id: car.id });
        expect(car).toBeDefined();
        expect(car!.model).toBe("Ford");
        expect(car!.available).toBe(true);
    });
    test("update", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const tobeUpdatedCar = await em.findOneOrFail(Car, { id: car.id });
        expect(tobeUpdatedCar!.model).toBe("Ford");
        expect(tobeUpdatedCar!.available).toBe(true);
        tobeUpdatedCar!.model = "Seat";
        await em.persistAndFlush(tobeUpdatedCar);
        const newCar = await em.findOne(Car, { id: car.id });
        console.log(newCar?.model);
        expect(newCar!.model).toBe("Seat");
    })
    test("delete", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const tobeDeletedCar = await em.findOne(Car, { id: car.id });
        expect(car).toBeDefined();
        await em.getRepository(Car).remove(tobeDeletedCar!);
        const newCar = await em.findOne(Car, { id: car.id });
        expect(newCar).toBeNull();
    });
});