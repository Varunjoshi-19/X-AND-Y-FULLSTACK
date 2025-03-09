import { ApolloServer } from "@apollo/server";
import { typeDefs , resolvers } from "./schema";

// CREATING GARPHQL SERVER

async function createGraphQLServer() {

    const server = new ApolloServer({
       typeDefs : typeDefs,
       resolvers  : resolvers
    })

    await server.start();

    return server;

}

export default createGraphQLServer;