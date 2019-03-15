import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../actions/userCredentials";
import { getProductList } from "../actions/productList";
import { getShopperCart, createCart, addItemToCart } from "../actions/cart";
import "./CheckoutList.css";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  orderData
} from "./calculateCosts";

export class CheckoutList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map(),
      calculate: false,
      key: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.calculate !== this.state.calculate) {
      if (this.props.cart !== null || this.props.shopper_cart !== null) {
        this.sendOrder(
          this.props.productid,
          this.state.items.get(this.state.key)
        );
      }
    }
    if (prevProps.cart !== this.props.cart) {
      this.sendOrder(
        this.props.productid,
        this.state.items.get(this.state.key)
      );
      // get shopper's updated cart
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.getShopperCart(shopperid);
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendOrder = (productid, value) => {
    // Go over map object to get productid and quantity
    // Add the products to the cart
    // Send this as an order
    const shopperid = localStorage.getItem("shopperid");
    const baseURL = "http://localhost:2019/cart/";

    const mapObject = this.state.items;
    const cartid =
      this.props.shopper_cart !== null
        ? this.props.shopper_cart.cartid
        : this.props.cart.cartid;
    const url = `${baseURL}update/${cartid}/${shopperid}/${productid}/${value}`;

    this.props.addItemToCart(url, shopperid);
  };
  handleAdd = () => {
    const productid = this.props.productid;
    const update = this.state.items;
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    console.log("Shopper id:", shopperid);

    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(shopperid);
    }

    // map productid to quantity

    update.set(productid, this.props.quantity + 1);
    this.setState({
      items: update,
      calculate: !this.state.calculate,
      key: productid
    });
  };

  handleSubtract = () => {
    const productid = this.props.productid;
    const update = this.state.items;
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(shopperid);
    }

    if (this.props.quantity === 0) {
      // do nothing, it was zero and it remains zero
    } else {
      update.set(productid, this.props.quantity - 1);
      this.setState({
        items: update,
        calculate: !this.state.calculate,
        key: productid
      });
    }
  };
  render() {
    return (
      <div className="list">
        {/* <h3>{this.props.productid}</h3> */}
        {/* {/* <h3>{this.props.name}</h3> */}
        <div className="itemCard">
          <div className="itemName">{`${this.props.description} $${
            this.props.itemPrice
          }`}</div>
          <div className="changeQuantity">
            <div className="inputPrice">
              <input placeholder={this.props.quantity} />
            </div>
            <div className="quantityButtons">
              <button className="addItem" onClick={this.handleAdd}>
                +
              </button>
              <button className="subtractItem" onClick={this.handleSubtract}>
                -
              </button>
            </div>
          </div>
          <div className="itemPrice">{this.props.price}</div>
        </div>
        {/* <h3>{this.props.price}</h3> */}
        {/* <h3>{this.props.quantity}</h3> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product_list: state.productList.product_list,
    new_product: state.productList.new_product,
    shopper_cart: state.cart.shopper_cart,
    set_user_info: state.userCredentials.set_user_info,
    items_in_cart_added: state.cart.items_in_cart_added,
    set_shopper_id: state.userCredentials.set_shopper_id,
    cart: state.cart.cart
  };
};
export default connect(
  mapStateToProps,
  {
    getProductList,
    getUserInfo,
    createCart,
    addItemToCart,
    getShopperCart
  }
)(CheckoutList);
