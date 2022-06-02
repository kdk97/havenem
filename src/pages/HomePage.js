import {useState, useEffect} from "react";
import {onSnapshot} from "firebase/firestore";
import {favsRef} from "../firebase-config";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(favsRef, data => {
            const favData = data
                .docs
                .map(doc => {

                    return {
                        ...doc.data(),
                        id: doc.id
                    };
                });
            console.log(favData);
            
            const filteredPosts = favData.filter((post) => post.name.toLowerCase().includes(searchValue) || post.category.toLowerCase().includes(searchValue));
            setPosts(filteredPosts);
        });
        return() => unsubscribe();
    }, [searchValue]);

    return (
        <section className="top-bar">
            <h1>Havenem</h1>
            <SearchBar setValue={setSearchValue} />
            <section className="grid-container">
                {posts.map(post => (<PostCard post={post} key={post.id}/>))}
            </section>

        </section>
    );
}
