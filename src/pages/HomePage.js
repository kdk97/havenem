import { useEffect, useState } from "react";
import logo from "../assets/img/skovl-logo.png"
import { onSnapshot, orderBy, query } from "@firebase/firestore";
import { postsRef } from "../firebase-config";



export default function HomePage({ showLoader }) {

    const [searchValue, setSearchValue] = useState("");
    const [posts, setPosts] = useState([]);
    const shuffledPosts = posts.sort(()=> Math.random() - Math.random());

    useEffect(()=>{
        const q = query(postsRef, orderBy("name"));
        const unsubscribe = onSnapshot(q, data => {
            const postsData = data.docs.map(doc => {
                return { ...doc.data(), id: doc.id };
            });
            setPosts(postsData);
        });
        return () => unsubscribe();
    }, []);

return(
    <section className="page">
    <div className="grid-container">
    {shuffledPosts.map(restaurant=>(
            <ResultCard restaurant={restaurant} key={restaurant.id}/>        
            ))}
    <img className="logo" src={logo} alt="skovl-logo" />
    </div>
    </section>
)

}