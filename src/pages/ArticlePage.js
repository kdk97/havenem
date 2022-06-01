import ArticleContent from "../components/ArticleContent";
import UserCard from "../components/UserCard";
import { postsRef } from "../firebase-config";
import { getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function ArticlePage () {

        const postId = data.id;
        const [post, setPost] = useState([]);

        useEffect(()=>{
        async function getPost () {
        const q = query(postsRef, where("id", "==", postId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setPost(doc.data())
        });
        }

        getPost();
                
        },[postId])
        console.log(post);

    return (
        <div className="article-page">
        <ArticleContent />
        <UserCard />
        </div>
    )
}