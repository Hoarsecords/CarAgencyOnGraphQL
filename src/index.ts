require('dotenv').config({ path: __dirname + '/.env' });
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CustomerResolver } from "./resolvers/customerResolvers";
import { ReservationResolver } from "./resolvers/reservationsResolver";
const main = async () => {
    const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core'); // to use graphql playground
    const orm = await MikroORM.init(mikroOrmConfig); // returns a promise
    orm.getMigrator().up();
    const emFork = orm.em.fork();

    const app = express();
    app.use(cors());
    const apolloServer = new ApolloServer({
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
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(8000, () => {
        console.log('server is listening on localhost:8000');
    })

}

main().catch(err => {
    console.error(err);
});