import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import HomePage from './pages/HomePage';
import Nav from "./components/Nav";
import LoginPage from './pages/LoginPage';
import PlanPage from "./pages/PlanPage";
import SignUpPage from './pages/SignUpPage';
import FrontPage from './pages/FrontPage';
import ProfilePage from "./pages/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";
import NyPlanPage from "./pages/NyPlanPage";
import MessagesPage from "./pages/MessagesPage";




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
          <Route path="/" element={<HomePage />} />
          <Route path="/tilfoj" element={<NyPlanPage />} />
          <Route path="/beskeder" element={<MessagesPage />} />
          <Route path="/plan/:id" element={<PlanPage />} />
          <Route path="/hjem" element={<Navigate to="/" />} />
          <Route path="/udlej-vare" element={<Navigate to="/" />} />
          <Route path="/min-profil" element={<ProfilePage />} />
          <Route path="/ny-plan" element={<NyPlanPage />} />
          <Route path="*" element={<Navigate to="/" />} />
       </Routes>
    </div>
  );

  const OutRoutes = (
    <>
      <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/kom-igang" element={<OnboardingPage />} />
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