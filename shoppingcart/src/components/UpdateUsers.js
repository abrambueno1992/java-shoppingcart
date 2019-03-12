import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import { addShopper } from "../actions/shoppers";
export class UpdateUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      cusername: "",
      cpassword: "",
      billingaddres: "",
      shippingaddress: "",
      phonenumber: "",
      paymentmethod: "",
      role: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createUser = e => {
    const userObject = {
      username: this.state.cusername,
      password: this.state.cpassword,
      role: this.state.role
    };
    this.props.createNewUser(userObject);
    this.setState({ cusername: "", cpassword: "", role: "" });
  };
  loginUser = e => {
    const userObject = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userObject);
    this.setState({ username: "", password: "" });
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

  setShopperId = e => {
    this.props.setShopperId();
  };

  getUserInfo = () => {
    this.props.getUserInfo();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_token !== this.props.user_token) {
      this.props.getUserInfo();
    }
  }

  render() {
    console.log("userid", localStorage.getItem("userid"));
    console.log("shopperid", localStorage.getItem("shopperid"));

    return (
      <div>
        <h3>Create a New User</h3>
        <div>
          <input
            name="cusername"
            placeholder="Enter a username"
            value={this.state.cusername}
            onChange={this.handleChange}
          />
          <input
            name="cpassword"
            placeholder="Enter a password"
            value={this.state.cpassword}
            onChange={this.handleChange}
          />
          <input
            name="role"
            placeholder="Enter a role"
            value={this.state.role}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.createUser}> Create USer</button>
        <h3>Login User</h3>
        <div>
          <input
            name="username"
            placeholder="Enter a username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            name="password"
            placeholder="Enter a password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.loginUser}>Login User</button>
        <h3>Create Shopper Profile</h3>
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
        <button onClick={this.setShopperId}>Set Shopper ID</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_token: state.user_token,
    set_user_info: state.set_user_info
  };
};

export default connect(
  mapStateToProps,
  { createNewUser, loginUser, setShopperId, addShopper, getUserInfo }
)(UpdateUsers);
