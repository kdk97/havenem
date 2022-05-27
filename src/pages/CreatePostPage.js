import React from 'react';
import missingimage from "../assets/img/no-image.png";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { useState, useEffect } from "react";

export default function CreatePostPage() {

    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [info, setInfo] = useState("");
    const navigate = useNavigate();

    useEffect(() => {  
        if (localStorage.getItem("image") === null) {
        setImage(missingimage)
          } else {
            setImage(localStorage.getItem("image"))    
          }
    },[])

    useEffect(() => {  
        if (localStorage.getItem("category") === null) {
        setCategory("diverse")
          } else {
            setCategory(localStorage.getItem("category"))    
          }
    },[])

    useEffect(() => {  
        if (localStorage.getItem("info") === null) {
        setInfo(null)
          } else {
            setInfo(localStorage.getItem("info"))    
          }
    },[])

    const writeToDatabase = () => {
      const uuid = uid() /* (brugernavn istedet for id?) */
      set(ref(db, `/${uuid}`)) /* (brugernavn istedet for uuid?) */
      image,
      category,
      info
    }

    const handleSubmitPost = (event) => {
      setImage(event.target.value)
      setCategory(event.target.value)
      setInfo(event.target.value)
    }
    
    /*
    const handleSubmitPost = (event) => {
        event.preventDefault();
        localStorage.setItem("image", image)
        localStorage.setItem("category", category)
        localStorage.setItem("info", info)

        ----------------------------------------------------------

        db.collection('posts').add({
          image: image,
          category: category,
          info: info,
        })
        .then(() => {
          alert("Din annonce er nu indsendt")
        })
        .catch((error) => {
          alert(error.message);
        });

        setImage("");
        setCategory("");
        setInfo("");

          navigate("/udlej-færdig");
        };
        */

    return (
      <form onSubmit={handleSubmitPost}>
            <h1>Opret annonce</h1>
            <div>
            <h2>Upload billede</h2>
            <label>
          <input
            type="file"
            className="file-input"
            accept="image/*"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            /* onChange={handleSubmitPost} */
          />
          <img
            className="image-preview"
            src={image}
            alt="Vælg"
            onError={(event) => (event.target.src = missingimage)}
          />
        </label>
        </div>
        <div className="select-category">
            <h2>Vælg kategori</h2>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="haveartikler"
            checked={category === 'haveartikler'}
          /> Haveartikler
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="maskiner"
            checked={category === 'maskiner'}
          /> Maskiner
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="moebler"
            checked={category === 'moebler'}
          /> Møbler
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="redskaber"
            checked={category === 'redskaber'}
          /> Redskaber
          </label>
          </div>
          <div className="category-button">
          <label>
          <input
            type="button"
            value="leg-og-fritid"
            checked={category === 'leg-og-fritid'}
          /> Leg og fritid
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="diverse"
            checked={category === 'diverse'}
          /> Diverse
          </label>
        </div>
        </div>
        <div className="post-info">
            <h2>Her kan du skrive yderligere information omkring det produkt, du vil udleje.</h2>
            <input
            className="post-info-text"
            type="text"
            value={info}
            onChange={(event) => setInfo(event.target.value)}
            /* onChange={handleSubmitPost} */
            placeholder="Skriv her"
            />
            <button
            type="submit"
            onSubmit={handleSubmitPost}
            /* onClick={writeToDatabase} */
            >Opret</button>
        </div>
        </form>
    )
}