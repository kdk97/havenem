import {addDoc} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {favsRef} from "../firebase-config";
import noimage from "../assets/img/no-image.png";


export default function NewFavList() {
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    const [name, setName] = useState("");
    const [Set, setSet] = useState(0);
    const [Reps, setReps] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        async function getPosts() {
            const url = "https://api.jsonbin.io/b/62974317402a5b380218285b/1";
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
            console.log(data);
        }
        getPosts();
    },);

    async function handleSubmit(event) {
        event.preventDefault();

        const newFavList = {
            name: name,
            image: image,
            posts: selectedPosts
        };

        await addDoc(favsRef, newFavList);
        navigate("/");
    }

    function handleAddPost() {
        const post = posts.find(post => post.id == selectedPost);
        console.log(Set, Reps, post);
        post.Set = Set;
        post.Reps = Reps;
        setSelectedPosts(prevSelectedPosts => [
            ...prevSelectedPosts,
            post
        ]);
    }

    function handleRemove() {
        console.log(selectedPost);
        const filteredData = selectedPosts.filter(post => post.id != selectedPost);
        setSelectedPosts(filteredData);
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
            // if not below 0.5MB display an error message using the errorMessage state
            setErrorMessage("Filen er for stor");
        }
    }

    return (<section className="page">
        <h1>Ny træningsplan</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <input
                Navngiv plan type="file" className="file-input" accept="image/*" onChange={handleImageChange}
                />
                <img
                    className="image-preview"
                    src={image}
                    alt="Vælg billede"
                    onError={event => (event.target.src = noimage)}/>
            </label>
            <label>
                Navngiv plan
                <input
                    type="text"
                    placeholder="Navngiv plan"
                    onChange={e => setName(e.target.value)}/>
            </label>
            <label>
                <section className="selected-posts">
                    {selectedPosts.length === 0 && <p>Ingen øvelser er tilføjet endnu</p>}
                    {
                        selectedPosts.map(post => (
                            <article class="ovelser2" key={post.id}>
                                {post.name}
                                Set: {post.Set}
                                - Reps: {post.Reps}<a className="right" onClick={() => handleRemove(post.id)}>X</a>
                            </article>
                        ))
                    }
                </section>
            </label>
            <section className="add-posts">
                <label>
                    Vælg øvelser
                    <select value={selectedPost} onChange={e => setSelectedPost(e.target.value)}>
                        <option>Øvelser</option>
                        {
                            posts.map(post => (
                                <option value={post.id} key={post.id}>
                                    {post.name}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <input type="number" placeholder="Set" onChange={e => setSet(e.target.value)}/>

                <input
                    type="number"
                    placeholder="Reps"
                    onChange={e => setReps(e.target.value)}/>

                <button type="button" onClick={handleAddPost}>
                    Tilføj øvelse
                </button>
            </section>

            <button type="submit">Opret træningsplan</button>
        </form>
    </section>
    );
}