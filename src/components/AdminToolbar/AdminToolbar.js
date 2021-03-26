import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
import { checkUserIsAmin } from "../../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function AdminToolbar() {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAmin(currentUser);
  if (!isAdmin) return null;

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">My Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminToolbar;