import UserDoc from "./model";
import { GraphQLBigInt } from "graphql-scalars";


interface TypeOfParams {
    limit: number,
    fields: []
};


export const typeDefs = ` 


scalar BigInt

type User {
 
id :  ID!
name : String!
username : String!
email : String!
phoneNo : BigInt!

}

type Todo {

id : ID!
title : String!
completed : Boolean
user : User
}


type Query { 

getTodos : [Todo]
getUsers(limit : Int!  , fields : [String!]) : [User]

}

`;

export const resolvers = {

    BigInt: GraphQLBigInt,

    Todo: {

        user: async (todo: any) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
            const result = await response.json();
            return result;
        }

    },


    Query: {

        getTodos: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const result = await response.json();
            return result;
        },

        getUsers: async (_: any, { limit, fields }: TypeOfParams) => {
            let projection: any = {}; 
        
            fields.map(field => {
                projection[field] = 1; 
            });
          
            const users = await UserDoc.find().limit(limit).select(projection);
            return users;
        }
        


    }

};