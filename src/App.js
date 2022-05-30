import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Loader from './components/Loader';
import HomePage from './pages/HomePage';
import Nav from "./components/Nav";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FrontPage from './pages/FrontPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from "./pages/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";


function App() {
   const [showLoader, setShowLoader] = useState(false); // default value of the loader is true (loader displayed)
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage
 
   const auth = getAuth();
 
   onAuthStateChanged(auth, (user) => {
     if (user) {
       
       setIsAuth(true); 
       localStorage.setItem("isAuth", true); 
     } else {
       
       setIsAuth(false); 
       localStorage.removeItem("isAuth"); 
     }
   });
   
  
   onAuthStateChanged(auth, (user) => {
      if (user) {
         setIsAuth(true);
         localStorage.setItem("isAuth", true);
      } else {
         setIsAuth(false);
         localStorage.removeItem("isAuth");
      }
   });

  const InRoutes = (
    <div >
       <Nav />
       <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/kom-igang" element={<OnboardingPage showLoader={setShowLoader} />} />
          <Route path="/tilfoj" element={<CreatePostPage showLoader={setShowLoader} />} />
          <Route path="/beskeder" element={<HomePage showLoader={setShowLoader} />} />
          <Route path="/hjem" element={<HomePage showLoader={setShowLoader} />} />
          <Route path="/udlej-vare" element={<CreatePostPage showLoader={setShowLoader} />} />
          <Route path="/min-profil" element={<ProfilePage showLoader={setShowLoader} />} />
          <Route path="*" element={<Navigate to="/" showLoader={setShowLoader} />} />
       </Routes>
    </div>
  );

  const OutRoutes = (
    <>
      <Routes>
          <Route path="/" element={<FrontPage showLoader={setShowLoader} />} />
          <Route path="/log-ind" element={<LoginPage showLoader={setShowLoader} />} />
          <Route path="/opret-bruger" element={<SignUpPage showLoader={setShowLoader} />} />
          <Route path="*" element={<Navigate to="/" showLoader={setShowLoader} />} />
      </Routes>
    </>
  );
  return (
  <main>
     {isAuth ? InRoutes : OutRoutes}
     {showLoader && <Loader />}

  </main>
  );
}

export default App;