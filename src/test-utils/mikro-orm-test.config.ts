import { __prod__ } from "../constants";
import { Customer } from "../entities/Customer";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Car } from "../entities/Car";
import { Driver } from "../entities/Driver";
import { Reservation } from "../entities/Reservation";

export default {
    migrations: {
        path: path.join(__dirname, "./test-migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Customer, Car, Driver, Reservation],
    dbName: 'CarAgency-example-test',
    user: 'postgres',
    password: 'elhalwagui',
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];