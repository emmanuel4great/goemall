import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import Logo from "./../../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
