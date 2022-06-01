import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import { postsRef } from "../firebase-config";
import { useEffect, useState } from "react";
import { onSnapshot, orderBy, query } from "@firebase/firestore";

export default function SearchResultsPage () {

    const [searchValue, setSearchValue] = useState("");
    const [posts, setPosts] = useState([]);
    const searchedPosts = posts.filter(post=> post.info.toLowerCase().includes(searchValue) || post.title.toLowerCase().includes(searchValue) || post.category.toLowerCase().includes(searchValue));

    useEffect(()=>{
        const q = query(postsRef, orderBy("date")); // order by: date
        const unsubscribe = onSnapshot(q, data => {
            const postsData = data.docs.map(doc => {
                // map through all docs (object) from post collection
                return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
            });
            setPosts(postsData);
        });
        return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    }, []);

    return (
        <div>
            <h1>Resultater</h1>
            <SearchBar setValue={setSearchValue}/>
            {searchedPosts.map(post=>(
            <ArticleCard post={post} key={post.id}/>        
            ))}
        </div>
    )
}