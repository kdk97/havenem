import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";

export default function UserCard () {

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
          <div className="usercard">
            <img src={post.userimage} />
            <h2>{post.user}</h2>
            <h3><a href={post.telephone}>+45{post.telephone}</a></h3>
            <h3>{post.address}</h3>
            <h3>{post.zipcode}, {post.city}</h3>
          </div>
      )
}