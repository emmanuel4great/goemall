import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
import { checkUserIsAmin } from "../../utils";
import { Typography } from "@material-ui/core";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function AdminToolbar() {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAmin(currentUser);
  if (!isAdmin) return null;

  return (
    <div className="adminToolbar">
      <Typography variant="body1" component={Link} to="/admin">
        Admin Panel
      </Typography>
    </div>
  );
}

export default AdminToolbar;
