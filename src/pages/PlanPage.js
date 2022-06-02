import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";

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
        console.log(post);
    }, [postId]);

    return (
        <section className="page">
            <h1>Annoncer</h1>           
            <img className="image-preview" src={post.image} alt="preview"/>
            <h2 className="pad">{post.category}</h2>
            <h1>{post.name}</h1>
            <p>{post.about}</p>
            <h2>{post.user}</h2>
            <h2>{post.telephone}</h2>
            <h2>{post.email}</h2>
            <h2>{post.address}</h2>
            <h2>{post.city}</h2>
        </section>
    );
}