import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";



export default function LoginPage({ showLoader }) {
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();
  
    useEffect(() => {
      showLoader(false);
    }, [showLoader]);

return(
    <h1>LoginPage</h1>
)

}