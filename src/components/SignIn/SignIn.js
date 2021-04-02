import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Divider } from "@material-ui/core";
import "./styles.scss";

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
    // eslint-disable-next-line
  }, [currentUser]);

  const configureAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configureAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <div className="inputWrap">
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
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="actions">
            <div className="links">
              <Typography variant="body1" component={Link} to="/recovery">
                Forget Password
              </Typography>
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
            >
              Login
            </Button>
            <div className="dividersWrap">
              <Divider className="divider" />
              <Typography variant="body2" color="textSecondary">
                OR
              </Typography>
              <Divider className="divider" />
            </div>
            <div className="socialSignin">
              <div className="row">
                <Button
                  onClick={handleGoogleSignIn}
                  color="secondary"
                  variant="contained"
                  disableElevation
                >
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div className="otherAuthOption">
          <Typography variant="body1" align="center" color="textSecondary">
            Don't have an account?{" "}
            <Typography component={Link} to="/registration" color="primary">
              Register
            </Typography>
          </Typography>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
