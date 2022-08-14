import { __prod__ } from "./constants";
import { Customer } from "./entities/Customer";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Car } from "./entities/Car";
import { Driver } from "./entities/Driver";
import { Reservation } from "./entities/Reservation";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Customer, Car, Driver, Reservation],
    dbName: 'CarAgency',
    user: 'postgres',
    password: 'elhalwagui',
    type: 'postgresql',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];