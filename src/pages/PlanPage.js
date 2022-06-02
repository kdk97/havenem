import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
            <img className="image-preview" src={post.image} alt="forhåndsvisning"/>
            <h2>{post.category}, {post.name}</h2>
            <p>{post.about}</p>
            <h2>{post.user}</h2>
            <h2><a href="tel:+45{post.telephone}">+45{post.telephone}</a></h2>
            <h2>{post.address}</h2>
            <h2>{post.zipcode}, {post.city}</h2>
        </section>
    );
}