import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Subtotal from "./Subtotal";
import ProductList from "./ProductList";
import TestLogin from "./TestLogin";
import TestCart from "./TestCart";
import TestOrders from "./TestOrders";
import UpdateUsers from "./UpdateUsers";
import UpdateCart from "./UpdateCart";
import UpdateOrders from "./UpdateOrders";
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
        <Route exact path="/cart" component={TestCart} />
        <Route exact path="/order" component={TestOrders} />
        <Route exact path="/updatelogin" component={UpdateUsers} />
        <Route exact path="/updatecart" component={UpdateCart} />
        <Route exact path="/updateorder" component={UpdateOrders} />
        {/* <Subtotal price={this.state.total.toFixed(2)} /> */}
      </div>
    </Router>
  );
};

export default App;
