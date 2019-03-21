import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// import classNames from "classnames";
import {
  createNewUser,
  loginUser,
  setShopperId,
  getUserInfo
} from "../actions/userCredentials";
import { getShopperCart } from "../actions/cart";
import { getProductList } from "../actions/productList";

import "./withAuth.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  navigate: {
    width: "12%",
    height: "3.5em",
    marginLeft: "83%",
    marginTop: "0.5em",
    color: "beige",
    fontWeight: "bold",
    backgroundColor: "blue",
    /* float: right; */
    transform: "scale(0.75)"
  },
  Logout: {
    width: "12%",
    height: "3em",
    marginLeft: "83%",
    backgroundColor: "black",
    color: "white",
    /* float: right; */
    transform: "scale(0.75)"
  }
});
const WithAuth = Page => {
  class BaseComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: false,
        checked: false,
        login: false,
        noShopperID: false
      };
    }
    componentDidMount() {
      if (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("userid") !== null &&
        localStorage.getItem("shopperid") !== null
      ) {
        if (
          localStorage.getItem("userid") !== "undefined" &&
          localStorage.getItem("token") !== "undefined" &&
          localStorage.getItem("shopperid") !== "undefined"
        ) {
          this.props.getUserInfo();
          this.props.getProductList();
          this.setState({ checked: true, authenticated: true });
          console.log("get user data WITH shopperid: ", this.props.match.path);
        }
      } else if (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("userid") !== null
      ) {
        if (
          localStorage.getItem("userid") !== "undefined" &&
          localStorage.getItem("token") !== "undefined"
        ) {
          this.props.getUserInfo();
          this.props.getProductList();
          console.log("get user data no shopperid: ", this.props.match.path);
          // this.props.history.push("/shopperprofile");
          this.setState({
            checked: true,
            authenticated: true,
            noShopperID: true,
            determineShopperID: false
          });
        }
      } else {
        console.log("Else what");
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
      if (this.props.product_list !== null) {
        console.log("change IN products");
        if (prevProps.set_user_info !== this.props.set_user_info) {
          console.log(
            "change user info NESTED",
            this.state.noShopperID,
            this.props.match.path === "/checkout"
          );
          if (
            this.props.match.path !== "/productlist" &&
            this.props.match.path !== "/checkout" &&
            this.props.match.path !== "/orders"
          ) {
            if (this.state.noShopperID === false) {
              this.props.history.push("/productlist");
            }
          }
        }
        if (
          this.props.match.path !== "/shopperprofile" &&
          this.state.noShopperID === true
        ) {
          console.log("redirect shopper NOshopperID");
          this.props.history.push("/shopperprofile");
        }

        if (
          this.state.login === true &&
          prevProps.set_user_info !== this.props.set_user_info
        ) {
          if (
            (this.props.match.path !== "/productlist" &&
              this.state.noShopperID === false) ||
            (this.props.match.path !== "/checkout" &&
              this.state.noShopperID === false)
          ) {
            this.props.history.push("/productlist");
          }
        }

        if (
          this.state.determineShopperID === true &&
          prevProps.set_user_info !== this.props.set_user_info
        ) {
          if (
            this.props.match.path !== "/productlist" &&
            this.props.match.path !== "/checkout" &&
            this.props.match.path !== "/orders"
          ) {
            this.props.history.push("/productlist");
          }
        }

        if (
          this.state.determineShopperID === true &&
          prevProps.set_user_info === this.props.set_user_info &&
          this.props.set_user_info === null
        ) {
          this.props.history.push("/shopperprofile");
        }
        if (
          this.state.determineShopperID === true &&
          prevProps.set_user_info === this.props.set_user_info &&
          this.props.set_user_info !== null
        ) {
          if (
            this.props.match.path !== "/productlist" &&
            this.props.match.path !== "/checkout" &&
            this.props.match.path !== "/orders"
          ) {
            this.props.history.push("/productlist");
          }
        }
      }
      if (
        prevProps.userCredentials.set_shopper_id !==
        this.props.userCredentials.set_shopper_id
      ) {
        this.props.getUserInfo();
      }

      if (prevProps.user_token !== this.props.user_token) {
        console.log("new user... getting userinfo");
        this.setState({ checked: true, authenticated: true, login: true });
        this.props.getUserInfo();
        this.props.getProductList();
      }

      if (prevState.login !== this.state.login) {
        if (
          prevProps.set_user_info === this.props.set_user_info &&
          this.props.set_user_info === null
        ) {
          console.log("redirect to shopperprofile");
          this.setState({ determineShopperID: true });
          // this.props.history.push("/shopperprofile");
        }
      }
    }
    handleRedirect = () => {
      this.props.history.push("/shopperprofile");
    };

    render() {
      const { children, classes, className, variant, ...other } = this.props;
      if (
        this.state.authenticated === true &&
        this.props.set_user_info !== null &&
        this.props.product_list !== null &&
        this.props.product_list.error !== "invalid_token"
      ) {
        return (
          <div className="parent">
            <Button
              variant="contained"
              color="primary"
              // className="Logout"
              className={classes.Logout}
              onClick={this.handleClear}
            >
              Log out
            </Button>
            {this.props.match.path === "/productlist" ? (
              <div>
                <Link to="/checkout">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.navigate}
                    // className="navigate"
                  >
                    Checkout
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.navigate}
                  >
                    Order History
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/productlist">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.navigate}
                    // className="navigate"
                  >
                    ProductList
                  </Button>
                </Link>
                {/* <Link to="/orders">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.navigate}
                  >
                    Order History
                  </Button>
                </Link> */}
              </div>
            )}
            <Page {...this.props} />
          </div>
        );
      } else if (
        this.props.product_list !== null &&
        this.props.product_list.error === "invalid_token"
      ) {
        return (
          <div>
            Loading...
            {/* <button className="Logout" onClick={this.handleClear}>
              Logout
            </button>
            <Page {...this.props} /> */}
            {this.handleClear()}
          </div>
        );
      } else if (this.state.noShopperID === true) {
        return (
          <div>
            <button className="Logout" onClick={this.handleClear}>
              Logout
            </button>

            <Page {...this.props} />
          </div>
        );
      }
      // else if (this.props.user_token !== null) {
      //   console.log("error props:,", this.props);
      //   return (
      //     <div>
      //       <Page {...this.props} />
      //       <div className="Error">{this.props.user_token.error} </div>
      //     </div>
      //   );
      // }
      else if (
        (this.state.determineShopperID === true &&
          this.props.userCredentials.set_shopper_id !== null &&
          this.props.product_list !== null) ||
        (this.state.determineShopperID === true &&
          this.props.set_user_info !== null &&
          this.props.product_list !== null)
      ) {
        return <div>LOL</div>;
      } else {
        return <Page {...this.props} />;
        // if (this.props.match.path !== "/") {
        //   console.log("rending this route", this.props.match.path);
        //   return <div>Redirecting, not authenticated</div>;
        // } else {
        //   console.log("rending this route", this.props.match.path);
        //   return (
        //     <div>
        //       <Page {...this.props} />;
        //     </div>
        //   );
        // }
        // return <div>LOL</div>;
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
  )(withStyles(styles)(BaseComponent));
};

export default WithAuth;
