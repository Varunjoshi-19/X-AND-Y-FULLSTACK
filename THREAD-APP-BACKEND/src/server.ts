import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { typeDefs , resolvers } from "./schema";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

// CREATING GARPHQL SERVER

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

async function GraphQLServer() {


    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await server.start();


    app.get("/", (req, res) => {
        res.json({ message: "server is up and running !" })
    })

    app.use("/graphql", expressMiddleware(server) as any);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })

};

GraphQLServer();


