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
import "./ListProducts.css";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  orderData
} from "./calculateCosts";

export class ListProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map(),
      calculate: false,
      key: null,
      inputQuantity: this.props.quantity,
      toggle: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.calculate !== this.state.calculate) {
      if (this.props.cart !== null || this.props.shopper_cart !== null) {
        console.log(
          "send order:",
          this.state.items.get(this.props.productid),
          this.state.items.get(this.state.key),
          this.state.key,
          this.props.productid
        );
        this.sendOrder(
          this.props.productid,
          this.state.items.get(this.state.key)
        );
      }
    }
    if (prevProps.set_user_info !== this.props.set_user_info) {
      // this.sendOrder(
      //   this.props.productid,
      //   this.state.items.get(this.state.key)
      // );
      // get shopper's updated cart
      // const shopperid =
      //   this.props.set_user_info !== null
      //     ? this.props.set_user_info.shopperxyz.shopperid
      //     : this.props.set_shopper_id.id;
      this.props.getShopperCart(
        this.props.set_user_info.shopperxyz.currentcartid
      );
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
      inputQuantity: e.target.value
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
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(shopperid);
    }

    // map productid to quantity
    if (this.props.quantity === undefined) {
      update.set(productid, 1);
    } else {
      update.set(productid, this.props.quantity + 1);
    }

    // update.set(productid, this.props.quantity + 1);
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
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    // crMyeate cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(shopperid);
    }

    // map productid to quantity
    if (this.props.quantity === undefined || this.props.quantity === 0) {
      // don't add 0 items to the cart
    } else if (this.props.quantity === 1) {
      // delete item , REMEMBER
      update.set(productid, this.props.quantity - 1);
      this.handleDelete();
    } else {
      update.set(productid, this.props.quantity - 1);
    }

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
  handleToggle = () => {
    const productid = this.props.productid;
    const toggleState = this.state.toggle;
    if (toggleState === false) {
      // toggleState.set(shopperid, true);
      this.setState({ toggle: true });
      // this.setState({ toggle: toggleState });
    } else {
      // toggleState.set(shopperid, !toggleState.get(shopperid));
      this.setState({ toggle: false });
    }
  };
  handleDelete = () => {
    const productid = this.props.productid;
    this.props.deleteProduct(this.props.shopper_cart.cartid, productid);
  };
  render() {
    return (
      <div key={this.props.productid} className="cards">
        <div className="wrap-product-info">
          <div>
            <b>Name:</b>
            {this.props.name}{" "}
            <div>
              <b>Item Price:</b> ${this.props.itemPrice}
            </div>
          </div>
          <div>
            <b>quantity:</b>
            {this.props.quantity !== undefined ? this.props.quantity : 0}
          </div>
        </div>
        <div>
          <div className="wrap-product-buttons">
            {this.state.toggle === true ? (
              <div>
                {this.props.description}
                <button className="info buttonBlue" onClick={this.handleToggle}>
                  hide info
                </button>
              </div>
            ) : (
              <div>
                <button className="info buttonBlue" onClick={this.handleToggle}>
                  show info
                </button>
              </div>
            )}
            <div>
              <button
                className="plusMinus btn btn-outline-primary"
                onClick={this.handleAdd}
              >
                +1
              </button>
              <button
                className="plusMinus btn btn-outline-primary"
                onClick={this.handleSubtract}
                disabled={this.state.quantity < 1}
              >
                -1
              </button>
            </div>
          </div>
        </div>
        <hr />
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
)(ListProducts);
