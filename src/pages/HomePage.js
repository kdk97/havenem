import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { favsRef } from "../firebase-config";
import PostCard from "../components/PostCard";

export default function HomePage({ post, showLoader }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(favsRef, data => {
            const favData = data.docs.map(doc => {
                
                return { ...doc.data(), id: doc.id }; 
            });
            console.log(favData);
            setPosts(favData);
            showLoader(false);
        });
        return () => unsubscribe(); 
    }, [showLoader]);

    function search(searchValue) {
        searchValue = searchValue.toLowerCase();
        console.log(searchValue);
    
        let result = [];
    
        for (let posts of setPosts) {
            let name = posts.name.toLowerCase();
            if (name.includes(searchValue.toLowerCase())) {
                result.push(posts);
            }
        }
        posts(result);
    }
    return (
        <section className="top-bar">
            <h3>Annoncer</h3>
            <input type="search" placeholder="Search" onkeyup="search(this.value)"></input>
            <section className="grid-container">
                {posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
                
            </section>

        </section>
    );
}

