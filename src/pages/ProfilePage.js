import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";

export default function ProfilePage({ showLoader }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [telephone, setTelephone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  useEffect(() => {

    async function getUser() {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email); 

        const docRef = doc(usersRef, auth.currentUser.uid); 
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          
          setName(userData.name);
          setAge(userData.age);
          setCity(userData.city);
          setAddress(userData.address);
          setImage(userData.image);
        }
      }
    }

    getUser();
  }, [auth.currentUser, showLoader]); 

  async function handleSubmit(event) {
    event.preventDefault();

    const userToUpdate = {
      name: name,
      age: age,
      city: city,
      address: address,
      image: image,
    }; 
    const docRef = doc(usersRef, auth.currentUser.uid); 
    await setDoc(docRef, userToUpdate); 
  }

  function handleSignOut() {
    signOut(auth); 
  }

  

  return (
    <section className="page">
      <div className="grid-container">
      <h1>Profil</h1>
      <form className="profilePage" onSubmit={handleSubmit}>
      <label>
          <input
            type="file"
            className="file-input"
            accept="image/*"
          />
          <img
            className="image-preview"
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </label>
        <label>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Angiv navn"
          />
        </label>
        <label>
          
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            name="age"
            placeholder="Angiv alder"
          />
        </label>
        <label>
          
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="Angiv by"
          />
        </label>
        <label>
          
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            placeholder="Angiv addresse"
          />
        </label>
        <label>
          
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            name="telefon"
            placeholder="Angiv Telefon nummer"
          />
        </label>
        <label>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Angiv email"
            disabled
          />
        </label>

        <p className="text-error">{errorMessage}</p>
        <button>Gem</button>
      </form>
      <button className="button-logud" onClick={handleSignOut}>
        Logud
      </button>
      </div>
    </section>
  );
}
