import React, { useState } from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Fab,
  IconButton,
  Drawer,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
  Button,
  Menu,
  Toolbar,
  Collapse,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Home from "@material-ui/icons/Home";
import Category from "@material-ui/icons/Category";
import Person from "@material-ui/icons/Person";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Shop from "@material-ui/icons/Shop";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Dashboard from "@material-ui/icons/Dashboard";
import ExitToApp from "@material-ui/icons/ExitToApp";
import PersonAdd from "@material-ui/icons/PersonAdd";

import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
import { checkUserIsAmin } from "../../utils";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

function Header(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const [collapse, setCollapse] = useState(false);

  const isAdmin = checkUserIsAmin(currentUser);

  const toggleDrawer = () => {
    setDrawer((prev) => !prev);
  };

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const toggleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  const menuPushTo = (path) => () => {
    history.push(`/${path}`);
    closeMenu();
  };

  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" className="mainHeader">
        <Toolbar>
          <div className="wrap">
            <div className="logo">
              <Hidden smUp>
                <IconButton color="inherit" onClick={toggleDrawer}>
                  <MenuIcon color="inherit" />
                </IconButton>
              </Hidden>
              <Link to="/">
                <img src="/images/logo.svg" alt="Logo" />
              </Link>
            </div>
            <div className="callToActions">
              <ul>
                {!currentUser && [
                  <li>
                    <Hidden xsDown>
                      <Button component={Link} to="/login" size="large">
                        Login
                      </Button>
                    </Hidden>
                  </li>,
                  <li>
                    <Hidden xsDown>
                      <Button component={Link} to="/registration" size="large">
                        Register
                      </Button>
                    </Hidden>
                  </li>,
                ]}
                <li>
                  <Fab
                    color="secondary"
                    size="small"
                    onClick={() => history.push("/cart")}
                  >
                    <Badge color="primary" badgeContent={totalNumCartItems}>
                      <ShoppingCart />
                    </Badge>
                  </Fab>
                </li>
                <Hidden mdUp>
                  {!currentUser && [
                    <li>
                      <div className="userAvatar" onClick={openMenu}>
                        U
                      </div>

                      <Menu
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        onClick={() => closeMenu()}
                      >
                        <ListItem button onClick={menuPushTo("login")}>
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                          <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button onClick={menuPushTo("registration")}>
                          <ListItemIcon>
                            <PersonAdd />
                          </ListItemIcon>
                          <ListItemText primary="Register" />
                        </ListItem>
                      </Menu>
                    </li>,
                  ]}
                </Hidden>
                {currentUser && [
                  <li>
                    <div className="userAvatar" onClick={openMenu}>
                      {currentUser.displayName[0]}
                    </div>
                    <Menu
                      open={Boolean(anchorEl)}
                      onClose={closeMenu}
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <ListItem button onClick={menuPushTo("dashboard")}>
                        <ListItemIcon>
                          <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="My Dasbhoard" />
                      </ListItem>
                      <ListItem button onClick={handleSignOut}>
                        <ListItemIcon>
                          <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                      </ListItem>
                    </Menu>
                  </li>,
                ]}
              </ul>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={toggleDrawer}>
        <div className="drawerWrap">
          <div
            className="bgImage"
            style={{
              backgroundImage: "url(/images/drawer_layer.png)",
            }}
          />
          <div className="wrap">
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <Home className="icon" />
                </ListItemIcon>
                <ListItemText primary="Home" />
                <ListItemSecondaryAction>
                  <ChevronRight />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button component={Link} to="/search">
                <ListItemIcon>
                  <Shop className="icon" />
                </ListItemIcon>
                <ListItemText primary="Shop" />
                <ListItemSecondaryAction>
                  <ChevronRight />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button onClick={() => toggleCollapse()}>
                <ListItemIcon>
                  <Category className="icon" />
                </ListItemIcon>
                <ListItemText primary="Category" />
                <ListItemSecondaryAction>
                  <ArrowDropDown />
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={collapse} tiimeout="auto" unmountOnExit>
                <List style={{ paddingLeft: "5rem" }}>
                  <ListItem button>
                    <ListItemText primary="Men" />
                    <ListItemSecondaryAction>
                      <ChevronRight />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Women" />
                    <ListItemSecondaryAction>
                      <ChevronRight />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <Person className="icon" />
                </ListItemIcon>
                <ListItemText primary="My Account" />
                <ListItemSecondaryAction>
                  <ChevronRight />
                </ListItemSecondaryAction>
              </ListItem>
              {isAdmin && (
                <ListItem button component={Link} to="/admin">
                  <ListItemIcon>
                    <SupervisorAccount className="icon" />
                  </ListItemIcon>
                  <ListItemText primary="Admin Panel" />
                  <ListItemSecondaryAction>
                    <ChevronRight />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;
