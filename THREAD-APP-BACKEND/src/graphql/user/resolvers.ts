import { UserService, UserPayloadType, LoginPayloadType  } from "../../services/user-service";

const queries = {

     userLogIn: async (parent: any, payload: LoginPayloadType) => {
          const token = await UserService.LoginInAccount(payload);
          return token;
     },

     getCurrentLoggedInUser: async (parent: any, params: any, context: any) => {

          if (context && context.user) {
           const id = context.user.id;
           const user = await UserService.getUserById(id);
           return user;
          }

          throw new Error("not avaliable");

     }

};

const mutations = {

     createUser: async (parent: any, payload: UserPayloadType) => {
          const user = await UserService.CreateNewUser(payload);
          return user.id;

     },


}

const resolvers = { queries, mutations };


export default resolvers;