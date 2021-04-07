import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "./../redux/User/user.actions";

import Header from "./../components/Header";
import VerticalNav from "./../components/VerticalNav";
import Footer from "./../components/Footer";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";
const DashBoardLayout = (props) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <List>
              <ListItem component={Link} to="/dashboard" button>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem onClick={() => signOut()} button>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </List>
          </VerticalNav>
        </div>
        <Paper className="content">{props.children}</Paper>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
