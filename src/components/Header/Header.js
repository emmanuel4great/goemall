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
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Home from "@material-ui/icons/Home";
import Category from "@material-ui/icons/Category";
import Person from "@material-ui/icons/Person";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Shop from "@material-ui/icons/Shop";
// import Logo from "./../../assets/logo.svg";

import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";

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

  return (
    <AppBar position="sticky" className="header">
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
        <nav>
          {/* <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul> */}
        </nav>
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
            {currentUser && [
              <li>
                <Avatar
                  src="/images/default_user.jpg"
                  alt=""
                  onClick={openMenu}
                  style={{ cursor: "pointer" }}
                />

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
                  <MenuItem onClick={() => history.push("/dashboard")}>
                    My Dashboard
                  </MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
                {/* <Link to="/dashboard">My Account</Link> */}
              </li>,
              // <li>
              //   <span onClick={signOut}>Logout</span>
              // </li>,
            ]}

            {/*
              {!currentUser && [
                <li>
                  <Link to="/registration">Register</Link>
                </li>,
                <li>
                  <Link to="/login">Login</Link>
                </li>,
              ]} */}
          </ul>
        </div>
      </div>
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
              <ListItem button>
                <ListItemIcon>
                  <Category className="icon" />
                </ListItemIcon>
                <ListItemText primary="Category" />
                <ListItemSecondaryAction>
                  <ChevronRight />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <Person className="icon" />
                </ListItemIcon>
                <ListItemText primary="My Account" />
                <ListItemSecondaryAction>
                  <ChevronRight />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button component={Link} to="/admin">
                <ListItemIcon>
                  <SupervisorAccount className="icon" />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" />
                <ListItemSecondaryAction>
                  <ChevronRight />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;
