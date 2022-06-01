import usersRef from "../firebase-config";
import { getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function UserCard () {

        const userId = data.id;
        const [user, setUser] = useState([]);

        useEffect(()=>{
        async function getUser () {
        const q = query(usersRef, where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setUser(doc.data())
        });
        }

        getUser();
                
        },[userId])
        console.log(user);
    
    return (
        <div className="user-card">
        <img src={user.image} />
        <h3>{user.name}</h3>
        <h3>{user.telephone}</h3>
        <h3>{user.address}, {user.city}</h3>
        </div>
    )
}