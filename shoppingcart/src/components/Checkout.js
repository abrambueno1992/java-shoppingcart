import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { getUserInfo } from "../actions/userCredentials";
import { getProductList } from "../actions/productList";
import { getShopperCart } from "../actions/cart";
import { addOrder } from "../actions/orders";
import CheckoutList from "./CheckoutList";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  productCost
} from "./calculateCosts";
import withAuth from "../lib/withAuth";
import "./CheckoutList.css";
export class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new Map(),
      fetchShopperID: false,
      totalCosts: 0,
      calculate: false,
      costMap: new Map(),
      key: null
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
      this.props.getShopperCart(this.props.set_user_info.shopperxyz.shopperid);
    }

    if (prevProps.shopper_cart !== this.props.shopper_cart) {
      const priceMap = productPriceMap(this.props.shopper_cart.products);
      const quantityMap = productQuantityMap(
        this.props.shopper_cart.cartitemquantity
      );
      this.setState({ items: quantityMap });
      const costMap = productCost(priceMap, quantityMap);
      const total = calculateTotalCosts(priceMap, quantityMap);
      this.setState({ totalCosts: total, costMap: costMap });
    }
    if (
      prevProps.items_in_cart_added !== this.props.items_in_cart_added &&
      prevProps.deleted_item === this.props.deleted_item
    ) {
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.getShopperCart(shopperid);
    }
    if (prevProps.deleted_item !== this.props.deleted_item) {
      const shopperid =
        this.props.set_user_info !== null
          ? this.props.set_user_info.shopperxyz.shopperid
          : this.props.set_shopper_id.id;
      this.props.getShopperCart(shopperid);
    }
  }

  handleOrder = () => {
    const shopperid =
      this.props.set_user_info !== null
        ? this.props.set_user_info.shopperxyz.shopperid
        : this.props.set_shopper_id.id;
    const cartid =
      this.props.shopper_cart !== null
        ? this.props.shopper_cart.cartid
        : this.props.cart.cartid;
    this.props.addOrder(shopperid, cartid, this.state.totalCosts);
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
    } else {
      let ordered = this.props.shopper_cart.products.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      return (
        <div className="checkoutElements">
          <div className="itemCard">
            <div className="itemName">Product</div>
            <div className="changeQuantity">Change quantity</div>
            <div className="itemPrice">Price</div>
          </div>
          <Divider variant="middle" />
          {ordered.map((each, i) => {
            return (
              <div  key={each + i}>
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
          <Divider variant="middle" />
          <div className="itemCard">
            <div className="itemName">Subtotal</div>
            <div className="changeQuantity"> </div>
            <div className="itemPrice">{this.state.totalCosts}</div>
          </div>
          <div className="sendOrder">
            <Button variant="contained" color="primary" onClick={this.handleOrder}>Send Order </Button>
          </div>
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
    deleted_item: state.cart.deleted_item
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  {
    getProductList,
    getUserInfo,
    getShopperCart,
    addOrder
  }
)(withAuth(Checkout));
