import React, { useEffect } from "react";
import "./default.scss";
import { Switch, Route } from "react-router-dom";

// layout
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";

// page
import HomePage from "./pages/HomePage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import Dashbaord from "./pages/Dashboard";
import WithAuth from "./hoc/WithAuth";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession);
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
