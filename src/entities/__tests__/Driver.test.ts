import { MikroORM } from "@mikro-orm/core";
import { Driver } from "../Driver";
import { SqlEntityManager } from "@mikro-orm/postgresql";
import { createMikroORM } from "../../index";


describe("Car", () => {
    let orm: MikroORM
    let driver: Driver;
    beforeAll(async () => {
        orm = await createMikroORM(true);
    });
    afterAll(async () => {
        await orm.close(true);
    })
    const testDriver = { name: "Bruce Wayne", available: true };
    test("create", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        driver = em.create(Driver, testDriver);
        await em.persistAndFlush(driver);
        driver = await em.findOneOrFail(Driver, { id: driver.id });
        expect(driver).toBeDefined();
        expect(driver!.name).toBe("Bruce Wayne");
        expect(driver!.available).toBe(true);
    });
    test("update", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const tobeUpdatedDriver = await em.findOneOrFail(Driver, { id: driver.id });
        expect(tobeUpdatedDriver!.name).toBe("Bruce Wayne");
        expect(tobeUpdatedDriver!.available).toBe(true);
        tobeUpdatedDriver!.name = "T'Challa";
        await em.persistAndFlush(tobeUpdatedDriver);
        const newDriver = await em.findOne(Driver, { id: driver.id });
        expect(newDriver!.name).toBe("T'Challa");
    })
    test("delete", async () => {
        const em = orm.em.fork() as SqlEntityManager;
        const tobeDeletedDriver = await em.findOne(Driver, { id: driver.id });
        expect(Driver).toBeDefined();
        await em.getRepository(Driver).remove(tobeDeletedDriver!);
        const newDriver = await em.findOne(Driver, { id: driver.id });
        expect(newDriver).toBeNull();
    });
});