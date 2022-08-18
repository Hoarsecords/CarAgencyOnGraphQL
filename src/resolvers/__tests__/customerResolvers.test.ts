import { Connection, EntityManager, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import mikroOrmTestConfig from '../../test-utils/mikro-orm-test.config';
import { MyContext } from '../../type';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import { ReservationResolver } from '../reservationsResolver';
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import { clearDatabase } from '../../test-utils/clearDatabase';
import { CustomerResolver } from '../customerResolvers'
import { expect } from 'chai'
let emFork: EntityManager<IDatabaseDriver<Connection>>
let app: any;
let orm: MikroORM<IDatabaseDriver<Connection>>
let customerResolver: CustomerResolver;
let schema: GraphQLSchema;
beforeEach(async () => {

    orm = await MikroORM.init(mikroOrmTestConfig); // returns a promise
    orm.getMigrator().up();
    emFork = orm.em.fork();
    app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [CustomerResolver, ReservationResolver],
            validate: false,
        }),
        context: () => ({
            em: emFork
        })
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
});

beforeEach(async () => {
    await clearDatabase(orm);
})


describe("resolvers", () => {
    it("register,login", async () => {
        customerResolver = new CustomerResolver();
        console.log(emFork);
        // const testCustomer = { name: "bilbo baggins", password: "12345", email: "bilbobaggins@shire.com", username: "Biblo", creditCard: "123456789", age: 150 };
        // const result = await customerResolver.register("bilbo baggins", "Biblo", "bilbobaggins@shire.com", 150, "123456789", "12345",);
        // console.log(result);
        // expect(result).to.equal(true);
    })
})