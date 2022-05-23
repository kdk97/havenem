import { Routes, Route, Navigate } from "react-router-dom";
/*import { getAuth, onAuthStateChanged } from "firebase/auth";*/
import { getAuth } from "firebase/auth";
import { useState } from "react";
import './App.css';
import Nav from "./components/Nav";
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';


  function App() {
   const isAuth = true;

  /*const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
   const auth = getAuth();
   
  
   onAuthStateChanged(auth, (user) => {
      if (user) {
         setIsAuth(true);
         localStorage.setItem("isAuth", true);
      } else {
         setIsAuth(false);
         localStorage.removeItem("isAuth");
      }
   });*/

  const InRoutes = (
    <div >
       <Nav />
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/udlej-vare" element={<CreatePostPage />} />
          <Route path="*" element={<Navigate to="/" />} />
       </Routes>
    </div>
  );

  const OutRoutes = (
    <>
      <Routes>
          <Route path="/front" element={<FrontPage/>}/>
          <Route path="/log-ind" element={<LoginPage/>}/>
          <Route path="/opret-bruger" element={<CreateAccountPage />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
  return <main>{isAuth ? InRoutes : OutRoutes}</main>;
}

export default App;