import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../actions/userCredentials";
import { getProductList } from "../actions/productList";
import { getShopperCart, createCart } from "../actions/cart";
import { addOrder } from "../actions/orders";
import CheckoutList from "./CheckoutList";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  productCost
} from "./calculateCosts";
// import {
//   getShopperCart,
//   createCart,
//   addItemToCart,
//   deleteProduct
// } from "../actions/cart";
import withAuth from "../lib/withAuth";
import "./CheckoutList.css";
import { Link } from "react-router-dom";
export class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map(),
      fetchShopperID: false,
      totalCosts: 0,
      calculate: false,
      costMap: new Map(),
      key: null,
      newCart: false,
      fetchNewCartData: false
    };
  }
  componentDidMount() {
    if (this.props.product_list === null) {
      this.props.getProductList();
    }
    if (this.props.set_user_info === null) {
      this.props.getUserInfo();
    }
    this.setState({ fetchShopperID: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.set_user_info !== this.props.set_user_info) {
      this.props.getShopperCart(
        this.props.set_user_info.shopperxyz.currentcartid
      );
    }

    if (
      prevProps.shopper_cart !== this.props.shopper_cart ||
      (prevState.fetchNewCartData === false &&
        this.state.fetchNewCartData === true)
    ) {
      console.log("running calculations:");

      // if (this.props.shopper_cart.products[0] !== undefined) {
      const priceMap = productPriceMap(this.props.shopper_cart.products);
      const quantityMap = productQuantityMap(
        this.props.shopper_cart.cartitemquantity
      );
      this.setState({ items: quantityMap });
      const costMap = productCost(priceMap, quantityMap);
      const total = calculateTotalCosts(priceMap, quantityMap);
      this.setState({ totalCosts: total, costMap: costMap });
      // }
    }
    if (
      prevProps.items_in_cart_added !== this.props.items_in_cart_added &&
      prevProps.deleted_item === this.props.deleted_item
    ) {
      this.props.getShopperCart(
        this.props.set_user_info.shopperxyz.currentcartid
      );
    }
    if (prevProps.deleted_item !== this.props.deleted_item) {
      this.props.getShopperCart(
        this.props.set_user_info.shopperxyz.currentcartid
      );
    }
    if (prevProps.new_order !== this.props.new_order) {
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.createCart(localStorage.getItem("shopperid"));
      this.setState({ newCart: true });
      // this.props.history.push("/productlist");
    }
    if (prevState.newCart === false && this.state.newCart === true) {
      this.props.getUserInfo();
      this.setState({ newCart: false });
    }
    if (prevState.newCart === true && this.state.newCart === false) {
      this.props.getShopperCart(
        this.props.set_user_info.shopperxyz.currentcartid
      );
      this.setState({ fetchNewCartData: true });
    }
  }

  handleOrder = () => {
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    const cartid = this.props.set_user_info.shopperxyz.currentcartid;

    this.props.addOrder(shopperid, cartid, this.state.totalCosts);

    // this.props.getShopperCart(cartid);
    // this.props.getUserInfo();
  };
  render() {
    if (this.props.product_list === null) {
      return <p>Loading...</p>;
    } else if (this.props.shopper_cart === null) {
      return (
        <div>
          <h3>Loading cart</h3>
        </div>
      );
    } else if (this.props.cart !== null && this.props.shopper_cart === null) {
      return <div>Loading items</div>;
    } else if (this.props.shopper_cart.products[0] === undefined) {
      return (
        <div>
          <h3>No products</h3>
        </div>
      );
    } else {
      let ordered = this.props.shopper_cart.products.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      return (
        <div>
          <div className="itemCard">
            <div className="itemName">Product</div>
            <div className="changeQuantity">Change quantity</div>
            <div className="itemPrice">Price</div>
          </div>
          <Link to="/orders">
            <button>Order History</button>
          </Link>
          {ordered.map((each, i) => {
            return (
              <div style={{ border: "2px solid black" }} key={each + i}>
                <CheckoutList
                  productid={each.productid}
                  name={each.name}
                  description={each.description}
                  price={this.state.costMap.get(each.productid)}
                  itemPrice={each.price}
                  quantity={this.state.items.get(each.productid)}
                />
              </div>
            );
          })}
          <div className="itemCard">
            <div className="itemName">Subtotal</div>
            <div className="changeQuantity"> </div>
            <div className="itemPrice">{this.state.totalCosts}</div>
          </div>
          <button onClick={this.handleOrder}>Send Order </button>
        </div>
      );
    }
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
    cart: state.cart.cart,
    deleted_item: state.cart.deleted_item,
    new_order: state.orders.new_order
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  {
    getProductList,
    getUserInfo,
    getShopperCart,
    addOrder,
    createCart
  }
)(withAuth(Checkout));
