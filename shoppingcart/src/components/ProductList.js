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
import { getShopperCart, createCart, addItemToCart } from "../actions/cart";

import { Item } from "./Item";
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
      url: [],
      fetchShopperID: false,
      show: false,
      toggle: new Map(),
      totalCosts: 0,
      calculate: false
    };
  }

  static propTypes = {
    prop: PropTypes
  };
  componentDidMount() {
    this.props.getProductList();
    // if (this.props.set_user_info === null) {
    this.props.getUserInfo();
    this.setState({ fetchShopperID: true });
    // }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.getShopperCart(shopperid);
    }
    if (
      prevState.fetchShopperID !== this.state.fetchShopperID &&
      this.props.set_user_info === null
    ) {
      this.props.getUserInfo();
      console.log("CDUP ", this.props.set_user_info);
    }
    console.log(
      "previous items: ",
      prevState.items,
      " items:",
      this.state.items
    );

    if (prevState.calculate !== this.state.calculate) {
      const priceMap = productPriceMap(this.props.shopper_cart.products);
      const quantityMap = productQuantityMap(
        this.props.shopper_cart.cartitemquantity
      );
      const total = calculateTotalCosts(priceMap, quantityMap);
      console.log("fired the calculator", priceMap, quantityMap, total);

      this.setState({ totalCosts: total });
    }
  }
  handleAdd = productid => {
    console.log("id: ", this.props.set_shopper_id);

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
    // this.props.updateItems(update);
    this.setState({ items: update, calculate: !this.state.calculate });
  };

  handleSubtract = productid => {
    // console.log(this.props.productid);
    // const productid = this.props.productid;
    // const productid = this.props.product_list[index].productid;
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
    if (update.get(productid) === undefined || update.get(productid) === 0) {
      update.set(productid, 0);
    } else {
      update.set(productid, update.get(productid) - 1);
    }
    this.setState({ items: update, calculate: !this.state.calculate });
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
        {this.props.product_list.map(item => {
          return (
            <div class="cards">
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
                        className="btn btn-outline-primary"
                        onClick={() => this.handleToggle(item.productid)}
                      >
                        hide info
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => this.handleToggle(item.productid)}
                      >
                        show info
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-6 text-right">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => this.handleAdd(item.productid)}
                  >
                    +1
                  </button>
                  <button
                    className="btn btn-outline-primary"
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
        {/* <div class="wrapper">
          <input
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            name="price"
            placeholder="Please enter a price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <input
            name="quantity"
            placeholder="Please enter a quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button onClick={this.sendNewProduct}>hey</button>
        </div> */}
        {/* <div class="item">{itemComponents}</div> */}
        <h3>{this.state.totalCosts}</h3>
        <button onClick={this.sendOrder}>Send Order </button>
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
    createNewProduct,
    getUserInfo,
    createCart,
    addItemToCart,
    getShopperCart
  }
)(ProductList);
