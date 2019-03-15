import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../actions/userCredentials";
import { getProductList } from "../actions/productList";
import {
  getShopperCart,
  createCart,
  addItemToCart,
  deleteProduct
} from "../actions/cart";
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
      key: null,
      inputQuantity: this.props.quantity
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
    const update = this.state.items;
    const productid = this.props.productid;
    // map productid to quantity
    const itemQty = parseInt(e.target.value, 10);
    update.set(this.props.productid, itemQty);

    this.setState({
      items: update,
      calculate: !this.state.calculate,
      key: productid,
      inputQuantity: itemQty
    });
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

    // map productid to quantity

    update.set(productid, this.props.quantity + 1);
    this.setState({
      items: update,
      inputQuantity: this.props.quantity + 1,
      calculate: !this.state.calculate,
      key: productid
    });
  };

  handleSubtract = () => {
    const productid = this.props.productid;
    const update = this.state.items;

    if (this.props.quantity === 0) {
      // this.props.deleteProduct(this.props.shopper_cart.cartid, productid);
      // do nothing, it was zero and it remains zero
    } else {
      update.set(productid, this.props.quantity - 1);
      this.setState({
        items: update,
        inputQuantity: this.props.quantity - 1,
        calculate: !this.state.calculate,
        key: productid
      });
    }
  };
  handleDelete = () => {
    const productid = this.props.productid;
    this.props.deleteProduct(this.props.shopper_cart.cartid, productid);
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
              <input
                placeholder={this.props.quantity}
                onChange={this.handleChange}
                name="inputQuantity"
                value={this.state.inputQuantity}
              />
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
          {this.state.inputQuantity !== 0 && this.props.quantity !== 0 ? (
            <div className="itemPrice">{this.props.price}</div>
          ) : (
            <button onClick={this.handleDelete} className="itemPrice">
              Delete Item
            </button>
          )}
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
    getShopperCart,
    deleteProduct
  }
)(CheckoutList);
