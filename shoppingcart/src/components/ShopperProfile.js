import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ShopperProfile.css";
import {
  createNewUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import { addShopper } from "../actions/shoppers";
import withAuth from "../lib/withAuth";
import { createCart } from "../actions/cart";
export class ShopperProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchUser: false,
      billingaddres: "",
      shippingaddress: "",
      phonenumber: "",
      paymentmethod: ""
    };
  }

  static propTypes = {
    prop: PropTypes
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_token !== this.props.user_token) {
      this.props.getUserInfo();
      this.setState({ fetchUser: true });
    }
    // if (prevProps.userCredentials !== this.props.userCredentials) {
    //   if (this.props.set_user_info === null && this.props.user_token !== null) {
    //     this.props.history.push("/shopperprofile");
    //   }
    // }
    if (prevState.fetchUser !== this.state.fetchUser) {
      alert("HEllo");

      if (this.props.set_user_info === null) {
        this.props.history.push("/shopperprofile");
      }
    }
    if (prevProps.new_shopper !== this.props.new_shopper) {
      this.props.setShopperId();
      this.props.createCart(localStorage.getItem("shopperid"));
      this.props.history.push("/productlist");
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createShopper = e => {
    const shopperObject = {
      billingaddres: this.state.billingaddres,
      shippingaddress: this.state.shippingaddress,
      phonenumber: this.state.phonenumber,
      paymentmethod: this.state.paymentmethod
    };
    this.props.addShopper(shopperObject);
    this.setState({
      billingaddres: "",
      shippingaddress: "",
      phonenumber: "",
      paymentmethod: ""
    });

    // this.props.setShopperId();
  };

  setShopperId = e => {};

  render() {
    return (
      <div class="profile">
        <h3>Shopper Profile</h3>
        <div>
          <input
            name="billingaddres"
            placeholder="Enter billing address"
            value={this.state.billingaddres}
            onChange={this.handleChange}
          />
          <input
            name="shippingaddress"
            placeholder="Please enter shipping address"
            value={this.state.shippingaddress}
            onChange={this.handleChange}
          />
          <input
            name="phonenumber"
            placeholder="Please enter a phone number"
            value={this.state.phonenumber}
            onChange={this.handleChange}
          />
          <input
            name="paymentmethod"
            placeholder="Please enter payment method"
            value={this.state.paymentmethod}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.createShopper}>Create Shopper</button>
        {/* <button onClick={this.setShopperId}>Set Shopper ID</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_token: state.userCredentials.user_token,
    set_user_info: state.userCredentials.set_user_info,
    new_shopper: state.shoppers.new_shopper,
    userCredentials: state.userCredentials
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { createNewUser, setShopperId, addShopper, createCart, getUserInfo }
)(withAuth(ShopperProfile));
