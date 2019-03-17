import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../actions/userCredentials";
import { getProductList } from "../actions/productList";
import { getShopperCart } from "../actions/cart";
import { addOrder } from "../actions/orders";
import ListProducts from "./ListProducts";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  productCost
} from "./calculateCosts";
import withAuth from "../lib/withAuth";
import "./ListProducts.css";
export class Product extends Component {
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
    // if (this.props.product_list === null) {
    //   this.props.getProductList();
    // }
    // if (this.props.set_user_info === null) {
    //   this.props.getUserInfo();
    // }
    // if (localStorage.getItem("token") === null) {
    //   this.props.history.push("/");
    // }
    // this.setState({ fetchShopperID: true });
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
      //   const total = calculateTotalCosts(priceMap, quantityMap);
      this.setState({ totalCosts: total, costMap: costMap });

      //   const priceMap = productPriceMap(this.props.shopper_cart.products);
      //   const quantityMap = productQuantityMap(
      //     this.props.shopper_cart.cartitemquantity
      //   );
      //   const orderedMap = new Map([...quantityMap.entries()].sort());
      //   this.setState({ items: orderedMap });
      const total = calculateTotalCosts(priceMap, quantityMap);
      this.setState({ totalCosts: total });
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
    } else {
      let ordered = this.props.product_list.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      return (
        <div>
          {ordered.map((each, i) => {
            return (
              <div key={each + i}>
                <ListProducts
                  productid={each.productid}
                  name={each.name}
                  description={each.description}
                  price={this.state.costMap.get(each.productid)}
                  quantity={this.state.items.get(each.productid)}
                  //   itemPrice={each.price}
                  //   quantity={this.state.items.get(each.productid)}
                />
              </div>
            );
          })}
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
)(withAuth(Product));
