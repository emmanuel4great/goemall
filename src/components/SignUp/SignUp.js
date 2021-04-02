import React, { useState, useEffect } from "react";
import "./styles.scss";

import { TextField, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
    // eslint-disable-next-line
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
          <div className="inputWrap">
            <TextField
              fullWidth
              type="text"
              name="displayName"
              value={displayName}
              label="Full Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextField
              fullWidth
              type="email"
              name="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="actions">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              // disableElevation
              fullWidth
              size="large"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="otherAuthOption">
          <Typography variant="body1" align="center" color="textSecondary">
            Don't have an account?{" "}
            <Typography component={Link} to="/login" color="primary">
              Login
            </Typography>
          </Typography>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
