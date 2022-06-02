import {addDoc, doc, getDoc} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {favsRef, usersRef} from "../firebase-config";
import noimage from "../assets/img/no-image.png";
import { getAuth } from "firebase/auth";


export default function NewFavList() {
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userImage, setUserImage] = useState("");
    const [userName , setUserName] = useState("");
    const [telephone , setTelephone] = useState("");
    const [address , setAddress] = useState("");
    const [email , setEmail] = useState("");
    const [city , setCity] = useState("");
    const [zipcode , setZipcode] = useState("");


    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        async function getPosts() {
            const url = "https://api.jsonbin.io/b/62974317402a5b380218285b/1";
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
            console.log(data);
            const authUser = auth.currentUser;
            const docRef = doc(usersRef, authUser.uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();
            setUserImage(userData.userImage);
            setUserName(userData.name);
            setTelephone(userData.telephone);
            setAddress(userData.address);
            setEmail(userData.email);
            setCity(userData.city);
            setZipcode(userData.zipcode);
            console.log(userData);
            
        }
        getPosts();
    },[]);

    async function handleSubmit(event) {
        event.preventDefault();

        const newFavList = {
            name: name,
            image: image,
            about: about,
            category: category,
            user: userName,
            telephone: telephone,
            address: address,
            zipcode: zipcode,
            city: city,
            userimage: userImage
        };

        await addDoc(favsRef, newFavList);
        navigate("/");
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

    return (<section className="page">
        <h1>Opret annonce</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <img
                    className="image-preview"
                    src={image}
                    alt="Vælg billede"
                    onError={event => (event.target.src = noimage)}/>
            </label>
                <input
                    Navngiv plan type="file" className="file-input" accept="image/*" onChange={handleImageChange}
                    />
            <label>
                <input
                    type="text"
                    placeholder="Navngiv produkt"
                    onChange={e => setName(e.target.value)}
                    required
                    />
            </label>
            <section className="add-posts">
                <label>
                    Vælg Kategori
                    <select value={category} onChange={e => setCategory(e.target.value)} required>
                        <option>Kategori</option>
                        {
                            posts.map(post => (
                                <option value={post.name} key={post.id}>
                                    {post.name}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <input type="text" placeholder="Om" onChange={e => setAbout(e.target.value)}
                required
                />
            </section>
            <button type="submit">Opret annonce</button>
        </form>
    </section>
    );
}