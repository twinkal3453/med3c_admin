import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./routes/login/login";
import MainRouter from "./router";
import UserRoute from "./auth/UserRoute";
import "./App.css";

function App() {
  return (
    <Router basename="admin">
      <div className="App">
        {/* <SideDrawer /> */}
        <Switch>
          <Route path="/login" exact component={Login} />
          <UserRoute path="/" exact component={MainRouter} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
