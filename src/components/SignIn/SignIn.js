import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };
  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  const configureAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configureAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
