import fake1 from "../assets/img/fake1.png"
import fake2 from "../assets/img/fake2.png"
import fake3 from "../assets/img/fake3.png"
import fake4 from "../assets/img/fake1.png"
import searchbar from "../assets/img/fakesearch.png"
import React from "react";
import logo2 from "../assets/img/skovl-logo2.png";

export default function FrontPage() {

    return (
        <section className="page">
            <img src={logo2} alt="havenem-logo2" className="logo2" />
            <h1>Beskeder</h1>
            <img className="beskeder" src={searchbar} alt="fake"/>
            <img className="beskeder" src={fake1} alt="fake"/>
            <img className="beskeder" src={fake2} alt="fake"/>
            <img className="beskeder" src={fake3} alt="fake"/>
            <img className="beskeder" src={fake4} alt="fake"/>
        </section>
    )
}