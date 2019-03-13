import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Item.css";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import { getProductList, createNewProduct } from "../actions/productList";
import {
  getShopperCart,
  createCart,
  addItemToCart,
  updateItems
} from "../actions/cart";

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map(),
      url: []
    };
  }

  componentDidMount = () => {
    // this.props.getProductList();
    // this.props.getUserInfo();
  };

  handleAdd = () => {
    // console.log(this.props.productid);
    const productid = this.props.productid;
    // const productid = this.props.product_list[index].productid;
    const update = this.state.items;
    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(this.props.set_user_info.shopperxyz.shopperid);
    }
    console.log("map", update);

    // map productid to quantity
    // if (update.get(productid) === undefined) {
    //   update.set(productid, 1);
    // } else {
    //   update.set(productid, update.get(productid) + 1);
    // }
    this.props.updateItems(update);
    // this.setState({ items: update });
  };

  handleSubtract = () => {
    // console.log(this.props.productid);
    const productid = this.props.productid;
    // const productid = this.props.product_list[index].productid;
    const update = this.props.items;
    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(this.props.set_user_info.shopperxyz.shopperid);
    }
    // map productid to quantity
    if (update.get(productid) === undefined || update.get(productid) === 0) {
      update.set(productid, 0);
    } else {
      update.set(productid, update.get(productid) - 1);
    }
    this.props.updateItems(update);
    // this.setState({ items: update });
  };

  sendOrder = () => {
    // Go over map object to get productid and quantity
    // Add the products to the cart
    // Send this as an order
    const shopperid = localStorage.getItem("shopperid");
    const baseURL = "http://localhost:2019/cart/";
    const url = [];
    // if (this.state.url[0] === undefined) {
    const mapObject = this.state.items;
    for (let [k, v] of this.state.items) {
      url.push(
        `${baseURL}add/${this.props.shopper_cart.cartid}/${shopperid}/${k}/${v}`
      );
      mapObject.delete(k);
    }
    // }
    if (url[0] !== undefined) {
      this.props.addItemToCart(url.shift());
      this.setState({ url: url });
    }
  };
  iterateUrl = () => {
    const url = this.state.url;
    console.log("Lenght:", url.length);
    const value = url.shift();
    this.setState({ url: url });
    this.props.addItemToCart(value);
    // url.shift();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.url[0] !== undefined) {
      this.iterateUrl();
    }
    if (prevProps.set_user_info !== this.props.set_user_info) {
      console.log("FIring getShopperCart");
      this.props.getShopperCart(this.props.set_user_info.shopperxyz.shopperid);
    }
    if (prevProps.cart !== this.props.cart) {
      this.props.getShopperCart(this.props.set_user_info.shopperxyz.shopperid);
    }
  }

  render() {
    console.log("map:", this.state.items);
    console.log("ITEM shopper_cart:", this.props.shopper_cart);

    return (
      <div class="cards">
        <div className="row form-group">
          <div className="col-sm-10">
            <h4>
              {this.props.name} {this.props.description}: ${this.props.price}
            </h4>
          </div>
          {/* <div className="col-sm-2 text-right">description: {this.props.description}</div> */}
          <div className="col-sm-2 text-right">
            quantity: {this.state.quantity}
          </div>
        </div>
        <div className="row btn-toolbar">
          <div className="col-6">
            <button className="btn btn-outline-primary" onClick={this.showInfo}>
              show info
            </button>
          </div>
          <div className="col-6 text-right">
            <button
              className="btn btn-outline-primary"
              onClick={this.handleAdd}
            >
              +1
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={this.handleSubtract}
              disabled={this.state.quantity < 1}
            >
              -1
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  product_list: state.productList.product_list,
  new_product: state.productList.new_product,
  shopper_cart: state.cart.shopper_cart,
  set_user_info: state.userCredentials.set_user_info,
  cart: state.cart.cart,
  items: state.cart.items
});

const mapDispatchToProps = state => {};

export default connect(
  mapStateToProps,
  {
    getProductList,
    createNewProduct,
    getUserInfo,
    createCart,
    addItemToCart,
    getShopperCart,
    updateItems
  }
)(Item);
