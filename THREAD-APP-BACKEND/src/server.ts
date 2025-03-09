import express, { Request } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserService } from "./services/user-service";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphQLServer from "./graphql/graphql-server";
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;


async function StartingServer() {


    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.get("/", (req, res) => {
        res.json({ message: "server is up and running !" })
    })

    app.use("/graphql", expressMiddleware(await createGraphQLServer(), {

        context: async ({ req }: { req: Request }) => {

            const token = req.headers["token"];

            if (!token) return {};   // return nothing empty { }

            const user = UserService.AuthorizationUser(token as string);

            return { user };    // [ must be enclosed inside this {} other wise you will face an error ] 

        }

    } as any) as any);



    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })

};

StartingServer();


