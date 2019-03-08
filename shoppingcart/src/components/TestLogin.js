import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser, loginUser } from "../actions/userCredentials";
class TestLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      cusername: "",
      cpassword: "",
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

  render() {
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
        <button>Login User</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_token: state.user_token
  };
};

export default connect(
  mapStateToProps,
  { createNewUser, loginUser }
)(TestLogin);
