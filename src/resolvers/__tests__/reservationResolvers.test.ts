import { ApolloServer } from "apollo-server-express";
import { createApolloServer, createMikroORM } from "../../index";

describe("resolvers", () => {
    // const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };
    // let customerId: number;
    let testServer: ApolloServer;
    beforeAll(async () => {
        testServer = await createApolloServer(true);
    });
    afterAll(async () => {
        // await testServer.stop();
    });

    test('reserve', async () => {
        const result = await testServer.executeOperation({
            query: `mutation reserve{
             reserve
             }`,
        });

        expect(result.errors).toBeUndefined();
        expect(typeof result?.data?.reservation).toBeDefined();
    })

});