import { createTestConn } from "src/utils/createTestConnection";
import { Connection } from "typeorm";

let conn: any;

beforeAll(async () => {
    conn = await createTestConn();
});

afterAll(async () => {
    await conn.close();
})

describe("resolvers", () => {
    it("register,login", async () => {
        const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };

    })
})