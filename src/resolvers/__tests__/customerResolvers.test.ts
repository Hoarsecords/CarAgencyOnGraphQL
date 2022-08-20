import { ApolloServer } from "apollo-server-express";
import { createApolloServer, createMikroORM } from "../../index";
import { MikroORM } from "@mikro-orm/core";
import { Customer } from "../../entities/Customer";
import { SqlEntityManager } from "@mikro-orm/postgresql";

describe("resolvers", () => {
    const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };
    let customerId: number;
    let testServer: ApolloServer;
    beforeAll(async () => {
        testServer = await createApolloServer(true);
        console.log(testServer);
    });
    afterAll(async () => {
        await testServer.stop();
    });
    test('register', async () => {
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

    test('login', async () => {
        const result = await testServer.executeOperation({
            query: `mutation register( $username: String!,$password: String! ) {
             register(password: $password,  username: $username)
             }`,
            variables: testCustomer,
        });

        expect(result.data?.customer).toEqual(customerId);


    })
})