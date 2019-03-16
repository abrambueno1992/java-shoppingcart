import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import "./withAuth.css";
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
        this.setState({ checked: true });
      } else {
        if (this.props.match.path !== "/") {
          this.props.history.push("/");
        }
      }
    }
    handleClear = () => {
      localStorage.clear();
      this.props.history.push("/");
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.set_user_info !== this.props.set_user_info) {
        if (this.props.set_user_info.shopperxyz !== null) {
          // redirect authenticated user to productlist
          // home page is for unathenticated users
          console.log("user info: ", this.props.set_user_info);

          if (this.props.match.path === "/") {
            this.props.history.push("/productlist");
          }
        } else {
          // if the authenticated user doesn't have shopper profile
          this.props.history.push("/shopperprofile");
        }
      }
      // if (
      //   this.state.checked === true &&
      //   prevProps.set_user_info === this.props.set_user_info
      // ) {
      //   this.handleClear();
      // }
      if (prevProps.user_token !== this.props.user_token) {
        this.setState({ authenticated: true });
        this.props.getUserInfo();
      }
    }

    render() {
      if (this.state.authenticated) {
        return (
          <div>
            <button className="Logout" onClick={this.handleClear}>
              Logout
            </button>
            {this.props.match.path === "/productlist" ? (
              <Link to="/checkout">
                <button className="navigate">Checkout</button>
              </Link>
            ) : (
              <Link to="/productlist">
                <button className="navigate">ProductList</button>
              </Link>
            )}
            <Page {...this.props} />
          </div>
        );
      } else if (this.props.user_token !== null) {
        return (
          <div>
            <Page {...this.props} />
            <div className="Error">{this.props.user_token.error} </div>
          </div>
        );
      } else {
        return <Page {...this.props} />;
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
