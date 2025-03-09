import mutations from "./user/mutations";
import resolver from "./user/resolvers";
import queries from "./user/queries";
import CustomtypeDefs from "./user/typedefs";


export const typeDefs = `

${CustomtypeDefs}

type Query {
 ${queries}
}

type Mutation { 
  ${mutations}
}

`;

export const resolvers = {

    Query: {
        ...resolver.queries
    },
    Mutation: {
        ...resolver.mutations
    }

}