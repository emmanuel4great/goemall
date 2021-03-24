import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link, withRouter } from "react-router-dom";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

function SignIn(props) {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInUser({ email, password }));

    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   resetForm();
    //   props.history.push("/");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };
  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signInSuccess]);

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

export default withRouter(SignIn);
