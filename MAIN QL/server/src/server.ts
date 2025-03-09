import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import bodyParser from "body-parser";
import cors from "cors";
import { typeDefs, resolvers } from "./schema";
import mongoose from "mongoose";
import UserDoc from "./model";


const app = express();
const port = 5000;

const server = new ApolloServer({

    typeDefs: typeDefs,
    resolvers: resolvers

})

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));




app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



async function startApolloServer() {

    await server.start();
    console.log("apollo server started");
    app.use("/graphql", expressMiddleware(server) as any);

}


app.post("/addUser", async (req: Request, res: Response) => {

    const { name, website ,username, email, phoneNo } = req.body;

    const query = {
        name,
        username,
        website,
        email,
        phoneNo
    }

    try {

        const user = await UserDoc.create(query);
        res.status(200).json({ message: "user created ", user });

    }
    catch (error: any) {
        res.status(505).json({ error: `Internal error : ${error}` })
    }


})


app.get("/", (req, res) => {
    res.send("GRAPHQL follow this link");
})



app.listen(port, () => {
    startApolloServer();
    mongoose.connect("mongodb://127.0.0.1:27017/TESTING")
    .then(() => console.log("mongodb connected")).
    catch(error => console.log(error));
    console.log("server running on port", port);
})