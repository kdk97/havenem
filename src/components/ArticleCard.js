import { useNavigate } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { useEffect, useState } from "react";

export default function ArticleCard () {

    const auth = getAuth();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/annonce/${post.slug}`);
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(usersRef, auth.currentUser.uid), doc => {
            setUser(doc.data());
        });
        return () => unsubscribe();
    }, [auth.currentUser.uid]);

    async function handleAddToFav(){
        const currentUserDocRef = doc(usersRef, auth.currentUser.uid);
              await updateDoc(currentUserDocRef, {
            favorites: arrayUnion(post.id)
        });
    }

    async function handleRemoveFromFav(){
            const currentUserDocRef = doc(usersRef, auth.currentUser.uid);
            await updateDoc(currentUserDocRef,{
                favorites: arrayRemove(post.id)
            });
        }

    return(
        <div className="ArticleCard" onClick={handleClick}>
            <div className="article-image">
            <img src={post.image} alt={post.category} />
            </div>
            <h2>{post.category}, {post.title}</h2>
            <h3>{user.city}</h3>
            <div className="buttons">
            {user.favorites?.includes(post.id) ? (
                  <button className="bookmark-button selected" onClick={handleRemoveFromFav}>
                  <svg className="bookmark-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#98341f"  viewBox="0 0 16 16">
                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
              </svg>
              </button>
            ) : (
                <button className="bookmark-button" onClick={handleAddToFav}>
                <svg className="bookmark-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff"  viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg>
            </button>
            )}
            </div>
            </div>
    )
}