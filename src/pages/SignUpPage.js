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
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [image, setImage] = useState("");
  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.email.value; 
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
      telephone: telephone,
      address: address,
      zipcode: zipcode,
      city: city,
      email: email,

    };
    console.log(userToUpdate);
    const docRef = doc(usersRef, auth.currentUser.uid);
    await setDoc(docRef, userToUpdate);
  }

  return (
    <section className="page">
      <div className="opret-bruger">
      
      <form onSubmit={handleSignUp}>
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
        <p >
        Opret bruger
      </p>
      <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="E-mail"
          />
        </label>
        <input
          type="password"
          name="password"
          placeholder="Kodeord"
        />
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Navn"
          />
        </label>
        <label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            name="Telefon"
            placeholder="Telefonnummer"
            maxLength="8"
          />
        </label>
        <label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            placeholder="Addresse"
          />
        </label>
        <label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="By"
          />
        </label>
        <label>
          <input
            type="tel"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            name="Postnummer"
            placeholder="Postnummer"
            maxLength="4"
          />
        </label>
        <p className="text-error">{errorMessage}</p>
        <button>Opret</button>
      </form>
      <p className="text-center">
        Har du allerede en bruger? <Link to="/sign-in">Log in</Link>
      </p>
      </div>
    </section>
  );
}