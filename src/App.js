import React from "react";
import "./default.scss";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Registration from "./pages/Registration";
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";

function App() {
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
      </Switch>
    </div>
  );
}

export default App;
