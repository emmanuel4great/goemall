import React, { Component, useEffect } from "react";
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
import { connect, useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";
import Dashbaord from "./pages/Dashboard";
import WithAuth from "./hoc/WithAuth";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      }

      dispatch(setCurrentUser(userAuth));
      // if (!userAuth) {
      //   this.setState({
      //     ...initialState,
      //   });
      // }
    });
    return () => {
      authListener();
    };
  }, []);

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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
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
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
          exact
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashbaord />
              </MainLayout>
            </WithAuth>
          )}
          exact
        />
      </Switch>
    </div>
  );
}

export default App;
