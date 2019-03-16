import React from "react";
import { connect } from "react-redux";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
const WithAuth = Page => {
  class BaseComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated:
          localStorage.getItem("token") !== null &&
          localStorage.getItem("userid") !== null
            ? true
            : false,
        checked: false
      };
    }
    componentDidMount() {
      if (this.state.authenticated === true) {
        this.props.getUserInfo();
      } else {
        this.props.history.push("/");
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.set_user_info !== this.props.set_user_info) {
        if (this.props.set_user_info.shopperxyz !== null) {
          // redirect authenticated user to productlist
          // home page is for unathenticated users
          if (this.props.match.path === "/") {
            this.props.history.push("/productlist");
          }
        } else {
          // if the authenticated user doesn't have shopper profile
          this.props.history.push("/shopperprofile");
        }
      }
    }

    render() {
      if (this.state.authenticated) {
        return <Page {...this.props} />;
      } else {
        return null;
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
  return connect(
    mapStateToProps,
    { createNewUser, loginUser, setShopperId, getUserInfo }
  )(BaseComponent);
};

export default WithAuth;
