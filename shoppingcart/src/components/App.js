import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Subtotal from "./Subtotal";
import ProductList from "./ProductList";
import TestLogin from "./TestLogin";
import ItemDetails from "./ItemDetails";

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       total: 100.0,
  //       taxes: 0,
  //       pickupSavings: -3.85,
  //       estimatedTotal: 0,
  //       disablePromoButton: false
  //   };
  // };
  return (
    <Router className="App">
      <div>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/login" component={TestLogin} />
        {/* <Subtotal price={this.state.total.toFixed(2)} /> */}
      </div>
    </Router>
  );
};

export default App;
