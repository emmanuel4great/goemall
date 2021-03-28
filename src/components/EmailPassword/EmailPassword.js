import React, { useState, useEffect } from "react";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPasswordStart,
  restUserState,
} from "../../redux/User/user.actions";
import { TextField, Button } from "@material-ui/core";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

function EmailPassword(props) {
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(restUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const configAuthWrapper = {
    headline: "Email Password",
  };

  console.log(errors);

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => (
              <li key={index}>{e}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <div className="actions">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
            >
              Email Password
            </Button>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;
