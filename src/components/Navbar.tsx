import { useState } from "react";
import { Dropdown } from "./Dropdown";
import "./Navbar.css";

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
   
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
            <img width="197" height="40" alt="Weather now logo" src="src/assets/images/logo.svg" />
        </li>
        <li>
          <button className="dropdown-button" type="button" onClick={() => setToggle(prev => !prev)} >
                <img width="16" height="16" src="src/assets/images/icon-units.svg" alt="Units icon" /> Units
            </button>
          { toggle && <Dropdown />}
        </li>
      </ul>
    </nav>
  );
};
