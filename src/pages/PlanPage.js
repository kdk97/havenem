import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";

export default function UpdatePage() {
    const params = useParams(); 
    const postId = params.id; 
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPost() {
            const docRef = doc(favsRef, postId); 
            const docData = await getDoc(docRef); 
            setPost(docData.data()); 
        }

        getPost();
    }, [postId]); 

    async function deletePost() {
        const confirmDelete = window.confirm(`Er du sikker på du vil slette ${post.name}?`); 
        if (confirmDelete) {
            const docRef = doc(favsRef, postId); 
            await deleteDoc(docRef); 
            navigate("/");
        }
    }

    return (
        <section className="page">
            <h1>Annoncer</h1>           
            <img className="image-preview" src={post.image} alt="preview"/>
            <p>{post.selected}</p>
            <h1>{post.name}</h1>
            <p>{post.about}</p>
        </section>
    );
}