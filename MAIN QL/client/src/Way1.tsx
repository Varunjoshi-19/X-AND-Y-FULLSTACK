import { useEffect, useState } from 'react'
import './App.css';

export const GRAPHQL_ENDPOINT = "http://localhost:5000/graphql";

type UserInfoType = {

  id?: String,
  name?: String,
  username?: String,
  email?: String,
  phoneNo?: any

}


function Way1() {

  const [users, setUsers] = useState<UserInfoType[]>([]);


  useEffect(() => {
    fetchAllUsers();
  }, [])

  async function fetchAllUsers() {
    const UserFetchquery = `
        query GetUser($limit : Int! , $fields : [String!]) { 

            getUsers(limit: $limit , fields: $fields) {
        
          name
          phoneNo
         username
         email
        
      }


      }
    `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: UserFetchquery,
        variables: {
          limit: 0,
          fields: ["email", "username", "phoneNo" , "name"],
        },
      }),
    });

    const result = await response.json();
    console.log(result); // Debugging
    setUsers(result.data.getUsers);
  }


  return (

    <div style={{ display  : "flex" ,gap : "20px" }}>
      {users.map((user, index) => (
        <div key={index} >

          <p>{user?.username}</p>
          <p>{user?.name}</p>
          <p>{user?.phoneNo}</p>
          <p>{user?.email}</p>
        </div>
      ))}
    </div>

  )
}

export default Way1
