import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/img/skovl-logo.png";
import { usersRef } from "../firebase-config";
import { doc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/user-placeholder.jpg"

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [image, setImage] = useState("");
  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value; 
    const password = event.target.password.value; 

    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log(user); 
        saveUserInfo();
      })
      .catch((error) => {
        let code = error.code; 
        console.log(code);
        code = code.replaceAll("-", " "); 
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  async function saveUserInfo() {
    const userToUpdate = {
      name: name, 
      age: age, 
      city: city, 
      adress: adress, 
    };
    console.log(userToUpdate);
    const docRef = doc(usersRef, auth.currentUser.uid);
    await setDoc(docRef, userToUpdate);
  }

  return (
    <section className="page">
      <img className="logo" src={logo} alt="Logo" />
      <p className="lille-tekst">
        Opret dig for at lave din egen træningsplan & dele den med andre
      </p>
      <form onSubmit={handleSignUp}>
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
            placeholder="Angiv dit navn"
          />
        </label>
        <label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            name="Telefon"
            placeholder="Angiv dit Telefon nummer"
          />
        </label>
        <input type="email" name="mail" placeholder="Indtast din email" />
        <label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            name="age"
            placeholder="Angiv din alder"
          />
        </label>{" "}
        <label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="Angiv by"
          />
        </label>{" "}
        <label>
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            name="adress"
            placeholder="Angiv adresse"
          />
        </label>
        <input
          type="password"
          name="password"
          placeholder="Indtast dit kodeord"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Sign Up</button>
      </form>
      <p className="text-center">
        Har du allerede en bruger? <Link to="/sign-in">Log in</Link>
      </p>
    </section>
  );
}