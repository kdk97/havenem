import { NavLink } from "react-router-dom";
import navaccount from "../assets/img/account.svg";
import navadd from "../assets/img/add.svg";
import navchat from "../assets/img/chat.svg";
import navhome from "../assets/img/home.svg";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/hjem"><img src= {navhome} alt="nav icon" ></img><p>Hjem</p></NavLink>
            <NavLink to="/tilfoj"><img src= {navadd} alt="nav icon" ></img><p>Udlej</p></NavLink>
            <NavLink to="/beskeder"><img src= {navchat} alt="nav icon" ></img><p>Beskeder</p></NavLink>
            <NavLink to="/min-profil"><img src= {navaccount} alt="nav icon" ></img><p>Profil</p></NavLink>
        </nav>
    );
}