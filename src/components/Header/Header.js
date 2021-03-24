import React from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./../../assets/logo.png";
import { signOutUserStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function Header(props) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  console.log(currentUser);

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
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <span onClick={signOut}>Logout</span>
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

export default Header;
