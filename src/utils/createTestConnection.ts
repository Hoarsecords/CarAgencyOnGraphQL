import { createConnection } from "typeorm"
export const createTestConn = async () => {
    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "elhalwagui",
        database: "CarAgency-example-test",
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities: ["src/entities/**/*"]
    })
}