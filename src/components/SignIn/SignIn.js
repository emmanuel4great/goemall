import React, { useState } from "react";
import "./styles.scss";
import { signInWithGoogle, auth } from "./../../firebase/utils";

import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

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
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
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
