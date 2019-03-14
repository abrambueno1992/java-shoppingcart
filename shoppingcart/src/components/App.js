import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductList from "./ProductList";

import Home from "./Home";
import ShopperProfile from "./ShopperProfile";
const App = () => {
  return (
    <Router className="App">
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/productlist" component={ProductList} />
        <Route exact path="/shopperprofile" component={ShopperProfile} />
      </div>
    </Router>
  );
};

export default App;
