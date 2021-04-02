import React from "react";
import "./styles.scss";
import { Typography } from "@material-ui/core";

function UserProfile(props) {
  const { currentUser } = props;
  const { displayName } = currentUser;

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="userAvatar">
            <Typography variant="h2">{displayName[0]}</Typography>
          </div>
        </li>
        <li>
          <Typography variant="h6" align="center">
            {displayName && displayName}
          </Typography>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
