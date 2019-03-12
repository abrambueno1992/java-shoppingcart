import { combineReducers } from "redux";
import cart from "./cart";
import orders from "./orders";
import productList from "./productList";
import shoppers from "./shoppers";
import userCredentials from "./userCredentials";
// import suppliers from "./suppliers"

export default combineReducers({
  cart,
  orders,
  productList,
  shoppers,
  userCredentials
});
