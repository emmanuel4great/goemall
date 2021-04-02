import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "./../UserProfile";
import "./styles.scss";
import { Divider, Paper } from "@material-ui/core";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function VerticalNav({ children }) {
  const { currentUser } = useSelector(mapState);

  console.log(currentUser);

  const configUserProfile = {
    currentUser,
  };

  return (
    <Paper className="verticalNav">
      <UserProfile {...configUserProfile} />

      <Divider />

      <div className="menu">{children}</div>
    </Paper>
  );
}

export default VerticalNav;
