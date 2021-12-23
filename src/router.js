import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideDrawer from "./routes/sidebar/sidebar";
import Dashboard from "./routes/dashboard/dashboard";
import Slider from "./routes/Slider/slider";
import Review from "./routes/Review/review";
import Country from "./routes/Country/country";
import University from "./routes/University/university";
import ContactUs from "./routes/ContactUs/contact";
import Application from "./routes/Application/application";
import Fees from "./routes/fees/fee";

const MainRouter = () => {
  return (
    <Router basename="admin">
      <div>
        <SideDrawer />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/slider" exact component={Slider} />
          <Route path="/review" exact component={Review} />
          <Route path="/country" exact component={Country} />
          <Route path="/university" exact component={University} />
          <Route path="/university/fee/:universityId" exact component={Fees} />
          <Route path="/contact" exact component={ContactUs} />
          <Route path="/application" exact component={Application} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainRouter;
