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
  const [adress, setAdress] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  useEffect(() => {
    showLoader(false);

    async function getUser() {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email); 

        const docRef = doc(usersRef, auth.currentUser.uid); 
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          
          setName(userData.name);
          setAge(userData.age);
          setCity(userData.city);
          setAdress(userData.adress);
          setImage(userData.image);
        }
      }
      showLoader(false);
    }

    getUser();
  }, [auth.currentUser, showLoader]); 

  async function handleSubmit(event) {
    event.preventDefault();
    showLoader(true);

    const userToUpdate = {
      name: name,
      age: age,
      city: city,
      adress: adress,
      image: image,
    }; 
    const docRef = doc(usersRef, auth.currentUser.uid); 
    await setDoc(docRef, userToUpdate); 
    showLoader(false);
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

          <img
            className="image-preview"
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
            <input
            type="file"
            className="file-input"
            accept="image/*"
          />
        </label>
        <label>
          Navn
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Angiv navn"
          />
        </label>
        <label>
          Alder
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            name="age"
            placeholder="Angiv alder"
          />
        </label>
        <label>
          By
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="Angiv by"
          />
        </label>
        <label>
          Adresse
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            name="adress"
            placeholder="Angiv adresse"
          />
        </label>
        <label>
          Email
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
