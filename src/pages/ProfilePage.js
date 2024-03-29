import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [image, setImage] = useState("");
  const [imagepreview, setImagePreview] = useState (null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();


  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {

    async function getUser() {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email); 

        const docRef = doc(usersRef, auth.currentUser.uid); 
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          
          setName(userData.name);
          setCity(userData.city);
          setZipcode(userData.zipcode);
          setAddress(userData.address);
          setEmail(userData.email);
          setTelephone(userData.telephone);
          setImagePreview(userData.image);
        }
      }
    }

    getUser();
  }, [auth.currentUser]); 

  async function handleSubmit(event) {
    event.preventDefault();

    const userToUpdate = {
      name: name,
      zipcode: zipcode,
      city: city,
      address: address,
      email: email,
      telephone: telephone,
      image: imagepreview,
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
          <img
            className="image-preview"
            src={imagepreview}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <input
            type="file"
            className="file-input"
            onChange={onChangePicture}
            accept="image/*"
          />
        </label>
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Angiv e-mail"
            disabled
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
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            name="telefon"
            placeholder="Angiv Telefon nummer"
            maxLength="8"
          />
        </label>
        <label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            placeholder="Angiv adresse"
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
            type="tel"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            name="postnummer"
            placeholder="Postnummer"
            maxLength="4"
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