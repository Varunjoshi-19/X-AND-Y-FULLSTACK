import { gql, useQuery } from "@apollo/client"

function Way2() {

    const GET_USER = gql`

query GetUser($limit : Int! , $fields : [String!]) { 

getUsers(limit: $limit , fields: $fields) {

name
phoneNo
username
email

}


}


`;



    const { loading, error, data } = useQuery(GET_USER, {

        variables: { limit: 3, fields: ["username", "email" , "name" , "phoneNo"] }
    });

    if (loading) return <p>Loading.....</p>
    if (error) return <p>{error.message}</p>

    return (

        <div>
            {data.getUsers.map((user: any, index: number) => (

                <div key={index} style={{ display : "flex" , gap : '20px'  }} >
                    <p>Username : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <p>Name : {user.name}</p>
                    <p>Phone-No : {user.phoneNo}</p>

                </div>

            ))}
        </div>
    )
}

export default Way2


