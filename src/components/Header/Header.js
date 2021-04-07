import React, { useState } from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  // Fab,
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
  InputBase,
  Typography,
  ButtonBase,
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
import Phone from "@material-ui/icons/Phone";

import { signOutUserStart } from "../../redux/User/user.actions";
import {
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { checkUserIsAmin } from "../../utils";
import { createStructuredSelector } from "reselect";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const mapState2 = createStructuredSelector({
  total: selectCartTotal,
});

function Header(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState({ category: null, profile: null });
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const { total } = useSelector(mapState2);

  const [collapse, setCollapse] = useState(false);

  const isAdmin = checkUserIsAmin(currentUser);

  const toggleDrawer = () => {
    setDrawer((prev) => !prev);
  };

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  // const openMenu = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };
  // const closeMenu = () => {
  //   setAnchorEl(null);
  // };

  const openProfileMenu = (e) => {
    setMenu((prev) => ({ ...prev, profile: e.currentTarget }));
  };

  const closeProfileMenu = () => {
    setMenu((prev) => ({ ...prev, profile: null }));
  };

  const toggleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  const menuPushTo = (path) => () => {
    history.push(`/${path}`);
    closeCategoryMenu();
    closeProfileMenu();
  };

  const handleSignOut = () => {
    signOut();
    closeProfileMenu();
  };

  const openCategoryMenu = (e) => {
    setMenu((prev) => ({ ...prev, category: e.currentTarget }));
  };

  const closeCategoryMenu = () => {
    setMenu((prev) => ({ ...prev, category: null }));
  };
  return (
    <React.Fragment>
      <AppBar position="static" className="mainHeader" elevation={0}>
        <Toolbar className="headerToolbar">
          <div className="iconButton">
            <Hidden smUp>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon color="inherit" />
              </IconButton>
            </Hidden>
          </div>
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="headerFormWrap">
            <InputBase
              placeholder="Type to search..."
              classes={{
                root: "searchInputRoot",
                input: "searchInput",
              }}
            />
            <ButtonBase
              classes={{
                root: "searchButton",
              }}
            >
              Search
            </ButtonBase>
          </div>
          <div className="helplineCartWrap">
            <div className="helplineWrap">
              <Phone />
              <div>
                <Typography variant="body2">Helpline:</Typography>
                <Typography variant="h6">01(271)232 421</Typography>
              </div>
            </div>
            <Button
              color="inherit"
              startIcon={
                <Badge color="secondary" badgeContent={totalNumCartItems}>
                  <ShoppingCart color="inherit" />
                </Badge>
              }
              onClick={() => history.push("/cart")}
            >
              ${total}
            </Button>
            <Hidden smDown>
              <Button
                color="inherit"
                endIcon={<ArrowDropDown />}
                onClick={openProfileMenu}
              >
                My Account
              </Button>
              <Menu
                open={Boolean(menu.profile)}
                onClose={closeProfileMenu}
                anchorEl={menu.profile}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClick={() => closeProfileMenu()}
              >
                {currentUser ? (
                  <List>
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
                  </List>
                ) : (
                  <List>
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
                  </List>
                )}
              </Menu>
            </Hidden>
          </div>

          {/* <div className="wrap">
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
                  <div className="cartButton">
                    <Fab
                      color="secondary"
                      // size="small"
                      onClick={() => history.push("/cart")}
                    >
                      <Badge color="primary" badgeContent={totalNumCartItems}>
                        <ShoppingCart />
                      </Badge>
                    </Fab>
                  </div>
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
     
      */}
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
                    <ListItemText primary="Men Outfit" />
                    <ListItemSecondaryAction>
                      <ChevronRight />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Women Outfit" />
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
              <ListItem button component={Link} to="/contact">
                <ListItemIcon>
                  <Phone className="icon" />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
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
      {/* <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Products" icon={<Home />} />
      </BottomNavigation> */}
      <Hidden smDown>
        <Toolbar className="headerNavWrap">
          <Button component={Link} to="/">
            Home
          </Button>
          <Button component={Link} to="/search">
            Product
          </Button>
          <Button onClick={openCategoryMenu} endIcon={<ArrowDropDown />}>
            Category
          </Button>
          <Button component={Link} to="/contact">
            Contact
          </Button>
        </Toolbar>
        <Menu
          open={Boolean(menu.category)}
          onClose={closeCategoryMenu}
          anchorEl={menu.category}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClick={() => closeCategoryMenu()}
          fullWidth
        >
          <ListItem button onClick={menuPushTo("search/mens")}>
            <ListItemText primary="Men Outfit" />
          </ListItem>
          <ListItem button onClick={menuPushTo("search/womens")}>
            <ListItemText primary="Women Outfit" />
          </ListItem>
        </Menu>
      </Hidden>
    </React.Fragment>
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;

// Music App in ReactJS & Material UI - Codes Explained (Open Source)
