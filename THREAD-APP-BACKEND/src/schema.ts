import primaClient from "./database/db";


type NewUserType = { 

firstName : string;
profileImageUrl? : string;
lastName : string;
email : string;
password : string ;

}

export const typeDefs = `

type Query { 

hello : String
sayName(name : String!) : String
}

type Mutation { 

createNewUser(firstName : String! , lastName : String! , email : String! , password : String!) : Boolean

}

`;

export const resolvers = {

    Query: {

        hello: () => "Hello world",
        sayName: (_: any, { name }: { name : string }): string => {
            return `Hello bro ${name}`
        }


    },

    Mutation : {
         
        createNewUser : async (parent : any , { firstName , lastName , email , password } : NewUserType) => {
             
         const userData = { 
           firstName , lastName, email, password,
           salt : "3e09cj190j1d"
         }

        await primaClient.user.create({
             data : userData
        })
        
        return true;

        }

    }

}