import logo from "../assets/img/skovl-logo.png"
import { Link } from "react-router-dom";
import React from "react";

export default function HomePage() {


    return(
        <div className="grid-container">
          <img className="logo" src={logo} alt="skovl-logo" />
          <button>
            <Link to="/opret-bruger">Opret bruger</Link>
          </button>
          <button>
            <Link to="/log-ind">Log ind</Link>
          </button>
          </div>
    )
}