import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Navbar } from "./components";
import { Home, LogIn, LogUp, Dashboard } from "./containers";

const AuthRoute = ({ isLogged }) => (
  <Route path="/dashboard">
    {isLogged ? (
      <>
        <h6>Dashboard</h6>
        {/* <Dashboard /> */}
      </>
    ) : (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )}
  </Route>
);

function App({account}) {
  const { isLogged} = account;
  return (
    <Router>
      <div className="principal-container">
        <Navbar 
        isLogged ={isLogged}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/log-up">
            <LogUp/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = ({ account }) => ({
  account,
});

export default connect(mapStateToProps)(App);
/**  */