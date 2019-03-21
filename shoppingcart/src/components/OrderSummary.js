import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOrdersByShopperId } from "../actions/orders";
import { getUserInfo } from "../actions/userCredentials";
import { getShopperCart } from "../actions/cart";
import withAuth from "../lib/withAuth";
import "./CheckoutList.css";
import OrderList from "./OrderList";
import "./OrderSummary.css";

export class OrderSummary extends Component {
  static propTypes = {
    prop: PropTypes
  };
  componentDidMount = () => {
    this.props.getUserInfo();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.set_user_info !== this.props.set_user_info) {
      this.props.getOrdersByShopperId(
        this.props.set_user_info.shopperxyz.shopperid
      );
      this.props.getShopperCart(this.props.set_user_info.shopperxyz.shopperid);
    }
  }

  render() {
    if (this.props.order_history !== null) {
      return (
        <div>
          <h3>Order history</h3>
          {this.props.order_history.map((each, i) => {
            return (
              <div className="order-summary" key={each + i}>
                <OrderList
                  order={each}
                  shopper_cart={this.props.shopper_cart}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    product_list: state.productList.product_list,
    set_user_info: state.userCredentials.set_user_info,
    items_in_cart_added: state.cart.items_in_cart_added,
    set_shopper_id: state.userCredentials.set_shopper_id,
    cart: state.cart.cart,
    shopper_cart: state.cart.shopper_cart,
    deleted_item: state.cart.deleted_item,
    order_history: state.orders.order_history_shopper
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getOrdersByShopperId, getUserInfo, getShopperCart }
)(withAuth(OrderSummary));
