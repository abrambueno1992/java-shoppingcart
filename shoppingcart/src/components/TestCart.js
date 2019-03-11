import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import { getProductList, createNewProduct } from "../actions/productList";
import { createCart, addItemToCart } from "../actions/cart";

export class TestCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map()
    };
  }

  componentDidMount = () => {
    this.props.getProductList();
  };

  handleAdd = index => {
    const productid = this.props.product_list[index].productid;
    const update = this.state.items;
    // create cart if there's none
    if (this.props.cart === null) {
      this.props.createCart();
    }
    // map productid to quantity
    if (update.get(productid) === undefined) {
      update.set(productid, 1);
    } else {
      update.set(productid, update.get(productid) + 1);
    }
    this.setState({ items: update });
  };

  sendOrder = () => {
    // Go over map object to get productid and quantity
    // Add the products to the cart
    // Send this as an order
    this.props.addItemToCart(this.state.items, this.props.cart.cartid);
  };

  render() {
    if (this.props.product_list === null) {
      return (
        <div>
          <h3>Test</h3>
        </div>
      );
    } else {
      console.log("State: ", this.state.items);

      return (
        <div>
          {this.props.product_list.map((each, i) => {
            return (
              <div
                style={{
                  width: "50%",
                  marginLeft: "25%",
                  border: "2px solid red",
                  display: "inline-flex"
                }}
                key={each + i}
              >
                <div>
                  <h3>{each.name}</h3>
                  <h3>{each.description}</h3>
                  <h3>{each.price}</h3>
                  <h3>{each.quantity}</h3>
                </div>
                <button onClick={() => this.handleAdd(i)}>Add Item</button>
              </div>
            );
          })}
          <button onClick={this.sendOrder}>Send Order </button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  product_list: state.product_list,
  new_product: state.new_product,
  cart: state.cart
});

const mapDispatchToProps = state => {};

export default connect(
  mapStateToProps,
  { getProductList, createNewProduct, getUserInfo, createCart, addItemToCart }
)(TestCart);
