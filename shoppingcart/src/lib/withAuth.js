import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import { getShopperCart } from "../actions/cart";

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
        console.log("get me userinfo");
      } else {
        if (this.props.match.path !== "/") {
          this.props.history.push("/");
        }
      }
    }
    handleClear = () => {
      localStorage.clear();
      this.props.history.push("/");
      this.setState({ checked: false });
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
      if (this.state.checked && this.props.error_user_info === undefined) {
        if (this.props.set_user_info === null) {
          // if (
          //   this.props.match.path === "/productlist" ||
          //   this.props.match.path === "/shopperprofile"
          // ) {
          console.log("clear, true");
          // this.setState({ checked: false });

          // this.handleClear();
          // }
        }
      }
      if (prevProps.user_token !== this.props.user_token) {
        this.setState({ checked: true });
        this.props.getUserInfo();
      }
      // if (prevProps.set_user_info !== this.props.set_user_info) {
      //   const shopperid =
      //     this.props.set_user_info !== null
      //       ? this.props.set_user_info.shopperxyz.shopperid
      //       : this.props.set_shopper_id !== null
      //       ? this.props.set_shopper_id.id
      //       : null;
      //   if (shopperid !== null) {
      //     this.props.getShopperCart(shopperid);
      //   }
      // }
    }

    render() {
      if (this.state.authenticated === true) {
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
      }
      // else if (this.state.authenticated) {
      //   return (
      //     <div>
      //       <button className="Logout" onClick={this.handleClear}>
      //         Logout
      //       </button>
      //       <Page {...this.props} />
      //     </div>
      //   );
      // }
      else if (this.props.user_token !== null) {
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
      cart: state.cart,
      shopper_cart: state.cart.shopper_cart,
      error_user_info: state.userCredentials.error_user_info,
      error: state.userCredentials.error
    };
  };
  return connect(
    mapStateToProps,
    { createNewUser, getShopperCart, loginUser, setShopperId, getUserInfo }
  )(BaseComponent);
};

export default WithAuth;
