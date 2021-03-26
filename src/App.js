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
import Admin from "./pages/Admin";
import WithAdminAuth from "./hoc/WithAdminAuth";
import AdminToolbar from "./components/AdminToolbar";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession);
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
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
          path="/search"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
          exact
        />
        <Route
          path="/search/:filterType"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/product/:productID"
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )}
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
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
          exact
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <DashBoardLayout>
                <Dashbaord />
              </DashBoardLayout>
            </WithAuth>
          )}
          exact
        />
      </Switch>
    </div>
  );
}

export default App;
