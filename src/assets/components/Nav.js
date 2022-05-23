import { NavLink } from "react-router-dom";
import navaccount from "../assets/img/account.png";
import navadd from "../assets/img/add.png";
import navcached from "../assets/img/cached.png";
import navchat from "../assets/img/chat.png";
import navhome from "../assets/img/home.png";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/*"><img src= {navhome} alt="nav icon" ></img><p>Hjem</p></NavLink>
            <NavLink to="/*"><img src= {navcached} alt="nav icon" ></img><p>Lån</p></NavLink>    
            <NavLink to="/*"><img src= {navadd} alt="nav icon" ></img><p></p></NavLink>
            <NavLink to="/*"><img src= {navchat} alt="nav icon" ></img><p>Beskeder</p></NavLink>
            <NavLink to="/*"><img src= {navaccount} alt="nav icon" ></img><p>Profil</p></NavLink>
        </nav>
    );
}