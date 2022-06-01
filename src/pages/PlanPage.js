import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";
import UserCard from "../components/UserCard";

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
        const confirmDelete = window.confirm(`Er du sikker på du vil slette denne plan?, ${post.name}?`); 
        if (confirmDelete) {
            const docRef = doc(favsRef, postId); 
            await deleteDoc(docRef); 
            navigate("/");
        }
    }

    return (
        <section className="page">
            <h1>{post.name}</h1>
            {post.posts?.map(øvelse => (
                <article className="ovelser">
                    <h2>{øvelse.name}</h2>
                    <p>
                       Set: {øvelse.Set} Reps: {øvelse.Reps}
                    </p>
                </article>
            ))}
            <UserCard />
        </section>
    );
}