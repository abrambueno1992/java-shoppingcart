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
import { getProductList } from "../actions/productList";

import "./withAuth.css";
const WithAuth = Page => {
  class BaseComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: false,
        checked: false
      };
    }
    componentDidMount() {
      if (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("userid") !== null
      ) {
        if (
          localStorage.getItem("userid") !== "undefined" &&
          localStorage.getItem("token") !== "undefined"
        ) {
          this.props.getUserInfo();
          this.setState({ checked: true, authenticated: true });
          // console.log("current path: ", this.props.match.path);
        } else {
          // console.log("current path: ", this.props.match.path);
          this.handleClear();
        }
      }
    }
    handleClear = () => {
      localStorage.clear();
      console.log("current path: ", this.props.match.path);

      if (this.props.match.path !== "/") {
        console.log("push to /");

        this.props.history.push("/");
        window.location.reload();
      }
      // this.setState({ checked: false });
    };

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.set_user_info !== this.props.set_user_info) {
        if (this.props.set_user_info.shopperxyz !== null) {
          this.props.getProductList();
        } else {
          // if the authenticated user doesn't have shopper profile
          this.props.history.push("/shopperprofile");
        }
      }
      if (
        prevProps.set_user_info === this.props.set_user_info &&
        this.props.set_user_info !== null
      ) {
        // console.log("user info didn't change: ", this.props.set_user_info);
        if (prevProps.product_list !== this.props.product_list) {
          if (
            this.props.product_list !== null &&
            this.props.product_list.error !== "invalid_token" &&
            this.props.set_user_info !== null &&
            localStorage.getItem("userid") !== "undefined"
          ) {
            if (this.props.match.path === "/") {
              this.props.history.push("/productlist");
            }
          } else {
            this.handleClear();
          }
        }
      }
      // else {
      //   console.log("no data for user info : ", this.props.set_user_info);
      //   if (this.state.authenticated === true) {

      //   } else {
      //     if (this.props.match.path !== "/") {
      //       this.handleClear();
      //     }
      //   }
      // }

      if (prevProps.user_token !== this.props.user_token) {
        this.setState({ checked: true, authenticated: true });
        this.props.getUserInfo();
      }
    }

    render() {
      if (
        this.state.authenticated === true &&
        this.props.set_user_info !== null
      ) {
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
      product_list: state.productList.product_list,
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
    {
      createNewUser,
      getProductList,
      getShopperCart,
      loginUser,
      setShopperId,
      getUserInfo
    }
  )(BaseComponent);
};

export default WithAuth;
