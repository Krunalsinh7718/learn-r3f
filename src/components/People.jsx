import { useEffect, useState } from "react"

export default function People() {
    const [users, setUsers] = useState([]);

    const getPeople = async () => {
        const users = await fetch('https://dummyjson.com/users');
        const result = await users.json();
        setUsers(result.users)
    }

    useEffect(() => {
       getPeople();
    }, [])
    return <>
    <h2>People</h2>
        <ul>
            {
                users.map((user,index) => {
                    return <li key={user.id}><b>Name : </b>{user.firstName+" "+user.lastName}</li>
                })
            }
            
        </ul>
    </>
}