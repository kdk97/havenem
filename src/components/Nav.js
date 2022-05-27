import { NavLink } from "react-router-dom";
import navaccount from "../assets/img/account.svg";
import navadd from "../assets/img/add.svg";
import navcached from "../assets/img/cached.svg";
import navchat from "../assets/img/chat.svg";
import navhome from "../assets/img/home.svg";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/hjem"><img src= {navhome} alt="nav icon" ></img><p>Hjem</p></NavLink>
            <NavLink to="/udlej-vare"><img src= {navcached} alt="nav icon" ></img><p>Lån</p></NavLink>    
            <NavLink to="/tilføj"><img src= {navadd} alt="nav icon" ></img><p>Tilføj</p></NavLink>
            <NavLink to="/beskeder"><img src= {navchat} alt="nav icon" ></img><p>Beskeder</p></NavLink>
            <NavLink to="/min-profil*"><img src= {navaccount} alt="nav icon" ></img><p>Profil</p></NavLink>
        </nav>
    );
}