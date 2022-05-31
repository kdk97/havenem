import React from 'react';
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { postsRef } from "../firebase-config";
import CreatePost from "../components/CreatePost";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function CreatePostPage() {

    const auth = getAuth();
    const navigate = useNavigate();
    
    async function handleSubmitPost (newPost) {
      console.log(handleSubmitPost)
      // showLoader(true); show the loader
      newPost.createdAt = serverTimestamp(); // timestamp (now)
      newPost.uid = auth.currentUser.uid; // uid of auth user / signed in user
      await addDoc(postsRef, newPost); // add new doc - new post object

      // showLoader(false); hide the loader
      navigate("/udlej-færdig");
  };

    return (
      <div>
      <h1>Opret annonce</h1>
      <CreatePost savePost={handleSubmitPost} />
      </div>
    )
}