import { useEffect, useState } from "react";
import logo from "../assets/img/skovl-logo.png"



export default function HomePage({ showLoader }) {


return(
    <section className="page">
    <div className="grid-container">
    <h1>homepage</h1>
    <img className="logo" src={logo} alt="skovl-logo" />
    </div>
    </section>
)

}