import logo from "../assets/img/logo.png"
import { Link } from "react-router-dom";

export default function FrontPage() {

    return (
        <section className="page">
        <main>
          <h1>Havenem</h1>
          <img className="logo" src={logo} alt="Logo" />
  
          <button>
              <Link to="/log-in">Log ind</Link>
            </button>
            <button>
              <Link to="/opret-bruger">Opret bruger</Link>
            </button>
        </main>
      </section>
    )
}