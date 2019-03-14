import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../actions/userCredentials";
import { getProductList } from "../actions/productList";
import { getShopperCart, createCart, addItemToCart } from "../actions/cart";
import "./ProductList.css";

import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts
} from "./calculateCosts";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map(),
      fetchShopperID: false,
      show: false,
      toggle: new Map(),
      totalCosts: 0,
      calculate: false,
      sendOrder: false,
      key: null
    };
  }

  componentDidMount() {
    this.props.getProductList();
    this.props.getUserInfo();
    this.setState({ fetchShopperID: true });
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.set_user_info !== this.props.set_user_info) {
      this.props.getShopperCart(this.props.set_user_info.shopperxyz.shopperid);
    }

    if (
      prevState.fetchShopperID !== this.state.fetchShopperID &&
      this.props.set_user_info === null
    ) {
      this.props.getUserInfo();
    }

    if (prevState.calculate !== this.state.calculate) {
      if (this.props.cart !== null || this.props.shopper_cart !== null) {
        this.sendOrder(this.state.key, this.state.items.get(this.state.key));
        // this.setState({ sendOrder: !this.state.sendOrder });
      }
    }
    if (prevProps.cart !== this.props.cart) {
      this.sendOrder(this.state.key, this.state.items.get(this.state.key));
      // this.setState({ sendOrder: !this.state.sendOrder });
      // get shopper's updated cart
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.getShopperCart(shopperid);
    }
    if (prevProps.shopper_cart !== this.props.shopper_cart) {
      const priceMap = productPriceMap(this.props.shopper_cart.products);
      const quantityMap = productQuantityMap(
        this.props.shopper_cart.cartitemquantity
      );
      this.setState({ items: quantityMap });
      const total = calculateTotalCosts(priceMap, quantityMap);
      this.setState({ totalCosts: total });
    }
    if (prevProps.items_in_cart_added !== this.props.items_in_cart_added) {
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.getShopperCart(shopperid);
    }
  }
  handleAdd = productid => {
    const update = this.state.items;
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(shopperid);
    }

    // map productid to quantity
    if (update.get(productid) === undefined) {
      update.set(productid, 1);
    } else {
      update.set(productid, update.get(productid) + 1);
    }
    this.setState({
      items: update,
      calculate: !this.state.calculate,
      key: productid
    });
  };

  handleSubtract = productid => {
    const update = this.state.items;
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    // create cart if there's none
    if (this.props.shopper_cart === null) {
      this.props.createCart(shopperid);
    }

    // map productid to quantity
    if (update.get(productid) === undefined) {
      update.set(productid, 0);
      this.setState({
        items: update,
        calculate: !this.state.calculate,
        key: productid
      });
    } else if (update.get(productid) === 0) {
      // do nothing, it was zero and it remains zero
    } else {
      update.set(productid, update.get(productid) - 1);
      this.setState({
        items: update,
        calculate: !this.state.calculate,
        key: productid
      });
    }
  };

  handleShowInfo = () => {
    this.setState({ show: true });
  };

  handleToggle = shopperid => {
    const toggleState = this.state.toggle;
    if (toggleState.get(shopperid) === undefined) {
      toggleState.set(shopperid, true);
      this.setState({ toggle: toggleState });
    } else {
      toggleState.set(shopperid, !toggleState.get(shopperid));
      this.setState({ toggle: toggleState });
    }
  };

  render() {
    if (this.props.product_list === null) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {this.props.product_list.map((item, i) => {
          return (
            <div key={item.productid + i} className="cards">
              <div className="row form-group">
                <div className="col-sm-10">
                  <h4>
                    {item.name} {item.description}: ${item.price}
                  </h4>
                </div>
                <div className="col-sm-2 text-right">
                  quantity: {this.state.items.get(item.productid)}
                </div>
              </div>
              <div className="row btn-toolbar">
                <div className="col-6">
                  {this.state.toggle.get(item.productid) === true ? (
                    <div>
                      {item.description}
                      <button
                        className="button buttonBlue btn btn-outline-primary"
                        onClick={() => this.handleToggle(item.productid)}
                      >
                        hide info
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="button buttonBlue btn btn-outline-primary"
                        onClick={() => this.handleToggle(item.productid)}
                      >
                        show info
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-6 text-right">
                  <button
                    className="button buttonBlue btn btn-outline-primary"
                    onClick={() => this.handleAdd(item.productid)}
                  >
                    +1
                  </button>
                  <button
                    className="button buttonBlue btn btn-outline-primary"
                    onClick={() => this.handleSubtract(item.productid)}
                    disabled={this.state.quantity < 1}
                  >
                    -1
                  </button>
                </div>
              </div>
              <hr />
            </div>
          );
        })}

        <div className="subtotal">

          <h3>{this.state.totalCosts}</h3>
          <button onClick={this.sendOrder}>Send Order </button>
        </div>
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
)(ProductList);
