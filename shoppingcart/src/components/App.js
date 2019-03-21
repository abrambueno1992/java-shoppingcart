import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from "./Product";
import Checkout from "./Checkout";
import Home from "./Home";
import ShopperProfile from "./ShopperProfile";
import OrderSummary from "./OrderSummary";
const App = () => {
  return (
    <Router style={{ textAlign: "center" }}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/productlist" component={Product} />
        <Route exact path="/shopperprofile" component={ShopperProfile} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/orders" component={OrderSummary} />
      </div>
    </Router>
  );
};

export default App;
