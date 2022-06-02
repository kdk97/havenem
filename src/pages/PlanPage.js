import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";
import UserCard from "../components/UserCard";

export default function UpdatePage() {
    const params = useParams(); 
    const postId = params.id; 
    const [post, setPost] = useState([]);

    useEffect(() => {
        async function getPost() {
            const docRef = doc(favsRef, postId); 
            const docData = await getDoc(docRef); 
            setPost(docData.data()); 
        }

        getPost();
    }, [postId]);

    return (
        <section className="page">
            <h1>Annoncer</h1>           
            <img className="image-preview" src={post.image} alt="preview"/>
            <p>{post.selected}</p>
            <h2 className="pad">{post.category}</h2>
            <h1>{post.name}</h1>
            <p>{post.about}</p>
            <UserCard />
        </section>
    );
}