import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import HomePage from './pages/HomePage';
import Nav from "./components/Nav";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FrontPage from './pages/FrontPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from "./pages/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";


function App() {
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
          <Route path="/tilfoj" element={<CreatePostPage />} />
          <Route path="/beskeder" element={<HomePage />} />
          <Route path="/hjem" element={<HomePage />} />
          <Route path="/udlej-vare" element={<CreatePostPage />} />
          <Route path="/min-profil" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" />} />
       </Routes>
    </div>
  );

  const OutRoutes = (
    <>
      <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/log-ind" element={<LoginPage />} />
          <Route path="/opret-bruger" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
  return (
  <main>
     {isAuth ? InRoutes : OutRoutes}

  </main>
  );
}

export default App;