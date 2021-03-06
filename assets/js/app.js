/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "../css/app.css";
import React, { useState } from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import authAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log("Hello Webpack Encore! Edit me in assets/js/app.js");

authAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );

  const NavbarWithRouter = withRouter(Navbar);

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <NavbarWithRouter />

        <main className="container pt-5">
          <Switch>
            <Route path="/login" render={(props) => <LoginPage {...props} />} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <PrivateRoute path="/invoices/:id" component={InvoicePage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
};

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
