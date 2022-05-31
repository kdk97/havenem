import logo from "../assets/img/skovl-logo.png"
import { Link } from "react-router-dom";
import React from "react";

export default function FrontPage() {


    return(
        <section className="page">
          <div className="front-page">
          <img className="logo" src={logo} alt="skovl-logo" />
          <h1>
            <Link to="/kom-igang">Kom i gang</Link>
          </h1>
          <p>Eller</p>
          <h1>
            <Link to="/log-ind">Log ind</Link>
          </h1>
          </div>
          </section>
    )
}