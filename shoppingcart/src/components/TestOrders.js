import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addOrder } from "../actions/orders";
import { getUserInfo } from "../actions/userCredentials";

export class TestOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinationaddress: "",
      quantity: "",
      totalcost: ""
    };
  }
  componentDidMount() {
    if (this.props.set_user_info === null) {
      this.props.getUserInfo();
    }
  }

  static propTypes = {
    prop: PropTypes
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitOrder = () => {
    const shopperID = this.props.set_user_info.shopperxyz.shopperid;
    const destAddress = this.props.set_user_info.shopperxyz.shippingaddress;
    const orderObject = {
      destinationaddress: destAddress,
      quantity: this.state.quantity,
      totalcost: this.state.totalcost
    };
    this.props.addOrder(orderObject, shopperID);
  };

  render() {
    return (
      <div>
        <h3>Add order</h3>
        {/* <input
          name="destinationaddress"
          value={this.state.destinationaddress}
          onChange={this.handleChange}
          placeholder={"Enter destination address"}
        /> */}
        <input
          name="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
          placeholder="Enter quantity? Self managed"
        />
        <input
          name="totalcost"
          value={this.state.totalcost}
          onChange={this.handleChange}
          placeholder="Enter Total Cost... self managed"
        />
        <button onClick={this.submitOrder}>Submit order</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  set_user_info: state.set_user_info
});

{
  /* const mapDispatchToProps = {
  
} */
}

export default connect(
  mapStateToProps,
  { addOrder, getUserInfo }
)(TestOrders);
