import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/utils";

import Logo from "./../../assets/logo.png";

export default function Header(props) {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="callToActions">
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>Logout</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  currentUser: null,
};
