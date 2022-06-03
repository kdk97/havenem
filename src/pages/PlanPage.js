import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";
import useravatar from "../assets/img/user.png";

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
            <div className="post-page">     
            <h1>Annonce</h1>     
                <img className="image-preview" src={post.image} alt="forhåndsvisning"/>
                <h2>{post.name}</h2>
                <h3>Kategori: {post.category}</h3>
                <p>{post.about}</p>
                <div className="usercard">
                    <img alt="profil" src= {useravatar}></img>
                    <div className="usercard-text">
                        <h3>{post.user}</h3>
                        <h3><a href={post.telephone}>+45{post.telephone}</a></h3>
                        <h3>{post.address}</h3>
                        <h3>{post.zipcode}, {post.city}</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}