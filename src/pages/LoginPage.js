import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/img/skovl-logo.png";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; 
    const password = event.target.password.value; 

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log(user); 
      })
      .catch((error) => {
        let code = error.code; 
        console.log(code);
        code = code.replaceAll("-", " "); 
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }
  return (
    <section className="page">
      <img className="logo" src={logo} alt="Logo" />
      <h1>Fitness Tracker</h1>
      <form onSubmit={signIn}>
        <input type="email" name="mail" placeholder="Indtast din email" />
        <input
          type="password"
          name="password"
          placeholder="Indtast dit kodeord"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Log ind</button>
      </form>
      <p className="text-center1">
        Har du ikke en bruger? <Link to="/sign-up">Opret</Link>
      </p>
    </section>
  );
}
