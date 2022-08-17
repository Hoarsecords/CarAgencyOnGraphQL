import { createConnection } from "typeorm"
export const testConnection = async (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "elhalwagui",
        database: "CarAgency-example-test",
        synchronize: drop,
        dropSchema: drop,
        logging: false,
        entities: [__dirname + "../entities/*.*"]
    })
}