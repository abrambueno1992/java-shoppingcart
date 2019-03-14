import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductList from "./ProductList";
import Checkout from "./Checkout";
import Home from "./Home";
import ShopperProfile from "./ShopperProfile";
const App = () => {
  return (
    <Router style={{ textAlign: "center" }}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/productlist" component={ProductList} />
        <Route exact path="/shopperprofile" component={ShopperProfile} />
        <Route exact path="/checkout" component={Checkout} />
      </div>
    </Router>
  );
};

export default App;
