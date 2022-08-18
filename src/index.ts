import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
require('dotenv').config({ path: __dirname + '/.env' });
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CustomerResolver } from "./resolvers/customerResolvers";
import { ReservationResolver } from "./resolvers/reservationsResolver";


export const createMikroORM = async (test = false) => {
    let options = {...mikroOrmConfig};
    const orm = await MikroORM.init(test ? {...options, dbName: 'CarAgency-example-test'} : options);
    await orm.getSchemaGenerator().refreshDatabase();
    return orm;
}

export const createApolloServer = async (test = false) => {
    const orm = await createMikroORM(test); // returns a promise
    const emFork = orm.em.fork();
    return new ApolloServer({
        schema: await buildSchema({
            resolvers: [CustomerResolver, ReservationResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            em: emFork,
            req: req,
            res: res
        }), // acssessable by the resolvers
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });
}
const main = async () => {

    const app = express();
    app.use(cors());
    const apolloServer = await createApolloServer()
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(8000, () => {
        console.log('server is listening on localhost:8000');
    })

}

main().catch(err => {
    console.error(err);
});