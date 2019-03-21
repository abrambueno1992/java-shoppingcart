import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  productPriceMap,
  productQuantityMap,
  calculateTotalCosts,
  productCost
} from "./calculateCosts";
import OrderDetails from "./OrderDetails";
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
      const priceMap = productPriceMap(this.props.order.cartstwo.products);
      const quantityMap = productQuantityMap(
        this.props.order.cartstwo.cartitemquantity
      );
      const costMap = productCost(priceMap, quantityMap);
      const total = calculateTotalCosts(priceMap, quantityMap);
      return (
        <div className="order-list">
          <span onClick={this.handleDetails}>{`
        orderid: ${this.props.order.orderid} 
        items: ${this.props.order.quantity} 
        total cost: ${this.props.order.totalcost}`}</span>
          {/* <h5>{this.props.order.quantity}</h5>
          <h5>{this.props.order.totalcost}</h5> */}
          <h5>Destination Address: {this.props.order.destinationaddress}</h5>
          <h5>Dispatch Address: {this.props.order.dispatchaddress}</h5>
          <h5>Shipped Status: {this.props.order.shippedstatus}</h5>
          {this.props.order.cartstwo.products.map((each, i) => {
            return (
              <div key={each + i}>
                <OrderDetails
                  price={priceMap.get(each.productid)}
                  quantity={quantityMap.get(each.productid)}
                  cost={costMap.get(each.productid)}
                  total={total}
                  product={each}
                />
              </div>
            );
          })}
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
