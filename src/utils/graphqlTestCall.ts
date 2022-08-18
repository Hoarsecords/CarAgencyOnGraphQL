import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools"
import { buildSchema } from "type-graphql";
import { CustomerResolver } from "../resolvers/customerResolvers"

// export const graphTestCall = async (query: any, variables?: any, username: string) => {
//     const schema = await buildSchema({
//         resolvers: [CustomerResolver],
//         validate: false,
//     })
// }