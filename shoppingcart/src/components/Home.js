import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createNewUser,
  loginUser,
  setShopperId,
  resetData,
  getUserInfo
} from "../actions/userCredentials";
import { addShopper } from "../actions/shoppers";
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
      fetchUser: false,
      doubleCheck: false,
      username: "",
      password: "",
      cusername: "",
      cpassword: "",

      role: ""
    };
  }

  static propTypes = {
    prop: PropTypes
  };
  handleButton = () => {
    this.setState({ login: !this.state.login });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_token !== this.props.user_token) {
      this.setState({ username: "", password: "", fetchUser: true });
    }

    if (
      prevState.fetchUser !== this.state.fetchUser &&
      this.props.set_user_info !== null
    ) {
      this.props.history.push("/productlist");
    }
    if (
      prevState.fetchUser !== this.state.fetchUser &&
      this.props.set_user_info === null
    ) {
      this.props.history.push("/shopperprofile");
    }
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
    // this.props.resetData();
    this.props.loginUser(userObject);
    this.props.getUserInfo();
    this.setState({ fetchUser: false });
  };

  render() {
    console.log("USERINFO: ", this.props.set_user_info);

    if (this.state.login === true) {
      return (
        <div>
          <button onClick={this.handleButton}>Signup</button>
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
            <button onClick={this.loginUser}>Login User</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.handleButton}>Login</button>
          <h3>Signup</h3>
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
            <button onClick={this.createUser}> Create USer</button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user_token: state.userCredentials.user_token,
    set_user_info: state.userCredentials.set_user_info,
    userCredentials: state.userCredentials,
    error: state.userCredentials.error
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { createNewUser, loginUser, setShopperId, addShopper, getUserInfo, resetData }
)(Home);
