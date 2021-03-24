import React, { useState, useEffect } from "react";
import "./styles.scss";

import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import AuthWrapper from "../AuthWrapper";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

function SignUp(props) {
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const configureAuthWrapper = {
    headline: "Registration",
  };

  return (
    <AuthWrapper {...configureAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
