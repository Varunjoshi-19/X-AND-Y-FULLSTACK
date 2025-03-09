TASKS -> To FETCH AND REQUEST limited amount of data from internet and database using GRAPHQL ? 


CLIENT SIDE : 

create a graphql query from the frontend side and request for limited amount of 
data and limited amount fields .

like for example ->  User {
     username, 
     name,
     email, 
     password, 
     id,
     address,
     phoneNo,
     createdAt,
     updatedAt
}

So , there are of information persent so we need just limited and specific fields
like -> [username , email , id] and only 5 entries .

CREATING GRAPHQL QUERY -> 

query GetUser($limit : Int! , $fields : [String!]) { 

getUsers(limit: $limit , fields: $fields) {

id
username
name

}

}

body: JSON.stringify({query: UserFetchquery, 
                      variables: { limit: 0, 
                                   fields: ["email", "username"] } 
                       })

----------------------------------------------------------------------------------------------------------------------------

SERVER SIDE : 
connect with database having some entries

and now  we need the same  function =>  getUsers(limit : Int! , fields : ["String!"]) 

graphql has two params one is 
1. typedef -> something like the interface and types in typecript
2. resolver -> the main implementation of things inside [typedef ] defines by this.