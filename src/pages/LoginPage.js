import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import logo from "../assets/img/logo.png"

export default function LoginPage({showLoader}) {
    
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      showLoader(false);
    }, [showLoader]);
    
    const auth = getAuth();

    function logIn(event) {
        event.preventDefault();
        const mail = event.target.mail.value; 
        const password = event.target.password.value; 
    
        signInWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            // Signed in
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
        <main>
          <h1>Havenem</h1>
          <img className="logo" src={logo} alt="Logo" />
          <form onSubmit={logIn}>
              <label>E-mail</label>
              <input type="text" name="email" id="email" placeholder="Indtast e-mail her"></input>
              <label>Password</label>
              <input type="password" name="password" id="password" placeholder="Indtast password her"></input> 
            <button>Log ind</button>
            </form>
            <button><Link to="/opret-bruger">Opret bruger</Link></button>
        </main>
      </section>
    )
}