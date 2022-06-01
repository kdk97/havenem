import { useEffect, useState } from "react";
import noimage from "../assets/img/no-image.png";

export default function CreatePost ({ savePost, post }) {

    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        if (post) {
            // if post, set the states with values from the post object.
            // The post object is a prop, passed from UpdatePage
            setImage(post.image);
            setCategory(post.category);
            setTitle(post.title);
            setInfo(post.info);
        }
    }, [post]);
    
    function handleSubmit(event) {
    event.preventDefault();
    const formData = {
        // create a new object to hold the value from states / input fields
        image: image,
        category: category,
        title: title,
        info: info
    };

    const validForm = formData.image && formData.category && formData.title && formData.info; // will return false if one of the properties doesn't have a value
        if (validForm) {
            // if all fields/ properties are filled, then call savePost
            savePost(formData);
        } else {
            // if not, set errorMessage state.
            setErrorMessage("Udfyld venligst alle felter for at fortsætte");
        }
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 1000000) {
            // image file size must be below 1MB
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage(""); // reset errorMessage state
        } else {
            // if not below 1MB display an error message using the errorMessage state
            setErrorMessage("Filen er for stor");
        }
    }

    return (
    <form onSubmit={handleSubmit}>
            <div>
            <h2>Upload billede</h2>
                <input 
                type="file" 
                className="file-input" 
                accept="image/*" 
                onChange={handleImageChange} 
                />
                <img 
                className="Forhåndsvisning" 
                src={image} 
                alt="Vælg billede" 
                onError={event => (event.target.src = noimage)} 
                />
        </div>
        <div className="select-category">
            <h2>Vælg kategori</h2>
        <div className="category-button">
          <input
            type="button"
            value="Haveartikler"
            checked={category === 'Haveartikler'}
          />
        </div>
        <div className="category-button">
          <input
            type="button"
            value="Maskiner"
            checked={category === 'Maskiner'}
          />
        </div>
        <div className="category-button">
          <input
            type="button"
            value="Møbler"
            checked={category === 'Møbler'}
          />
        </div>
        <div className="category-button">
          <input
            type="button"
            value="Redskaber"
            checked={category === 'Redskaber'}
          />
          </div>
          <div className="category-button">
          <input
            type="button"
            value="Leg og fritid"
            checked={category === 'Leg og fritid'}
          />
        </div>
        <div className="category-button">
          <input
            type="button"
            value="Diverse"
            checked={category === 'Diverse'}
          />
        </div>
        </div>
        <div className="post-title">
            <h2>Overskrift på annonce</h2>
            <input
            className="post-title-text"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Overskrift"
            />
        </div>
        <div className="post-info">
            <h2>Information omkring produktet</h2>
            <input
            className="post-info-text"
            type="text"
            value={info}
            onChange={(event) => setInfo(event.target.value)}
            placeholder="Produktinformation"
            />
            <button
            type="submit"
            >Opret</button>
        </div>
        </form>
    )
}