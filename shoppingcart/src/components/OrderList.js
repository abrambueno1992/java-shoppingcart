import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  productCost
} from "./calculateCosts";
export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    };
  }

  static propTypes = {
    prop: PropTypes
  };
  handleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    if (this.state.showDetails === false) {
      return (
        <div className="order-list">
          <span onClick={this.handleDetails}>{`
        orderid: ${this.props.order.orderid} 
        items: ${this.props.order.quantity} 
        total cost: ${this.props.order.totalcost}`}</span>
          {/* <h5>{this.props.order.quantity}</h5>
        <h5>{this.props.order.totalcost}</h5>
        <h5>{this.props.order.destinationaddress}</h5>
        <h5>{this.props.order.dispatchaddress}</h5>
        <h5>{this.props.order.shippedstatus}</h5> */}
        </div>
      );
    } else {
      const priceMap = productPriceMap(this.props.shopper_cart.products);
      const quantityMap = productQuantityMap(
        this.props.shopper_cart.cartitemquantity
      );
      //   this.setState({ items: quantityMap });
      const costMap = productCost(priceMap, quantityMap);
      //   const total = calculateTotalCosts(priceMap, quantityMap);
      //   this.setState({ totalCosts: total, costMap: costMap });

      //   const priceMap = productPriceMap(this.props.shopper_cart.products);
      //   const quantityMap = productQuantityMap(
      //     this.props.shopper_cart.cartitemquantity
      //   );
      //   const orderedMap = new Map([...quantityMap.entries()].sort());
      //   this.setState({ items: orderedMap });
      const total = calculateTotalCosts(priceMap, quantityMap);
      //   this.setState({ totalCosts: total });
      return (
        <div>
          <span onClick={this.handleDetails}>{`
        orderid: ${this.props.order.orderid} 
        items: ${this.props.order.quantity} 
        total cost: ${this.props.order.totalcost}`}</span>
          <h5>{this.props.order.quantity}</h5>
          <h5>{this.props.order.totalcost}</h5>
          <h5>{this.props.order.destinationaddress}</h5>
          <h5>{this.props.order.dispatchaddress}</h5>
          <h5>{this.props.order.shippedstatus}</h5>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
