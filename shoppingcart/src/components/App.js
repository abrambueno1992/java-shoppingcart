import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components import
import ProductList from "./ProductList";

const App = () => {
  return (
    <Router className="App">
      <div>
        <Route exact path="/" component={ProductList} />
      </div>
    </Router>
  );
};

export default App;
