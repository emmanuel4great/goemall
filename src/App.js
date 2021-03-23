import React, { Component } from "react";
import "./default.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";

// layout
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";

// page
import HomePage from "./pages/HomePage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";

class App extends Component {
  authListener = null;

  componentDidMount() {
    console.log(this.props);
    const { setCurrentUser } = this.props;
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
      // if (!userAuth) {
      //   this.setState({
      //     ...initialState,
      //   });
      // }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            render={() => (
              <HomePageLayout>
                <HomePage />
              </HomePageLayout>
            )}
            exact
          />
          <Route
            path="/registration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
            }
            exact
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
            exact
          />
          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <RecoverPassword />
              </MainLayout>
            )}
            exact
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
