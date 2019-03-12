// import { GET_PRODUCTS, NEW_PRODUCT } from "../actions/productList";
// import {
//   CREATE_CART,
//   ADD_ITEM_TO_CART,
//   GET_SHOPPER_CART
// } from "../actions/cart";
// import {
//   CREATE_USER,
//   LOGIN_USER,
//   SET_SHOPPER_ID,
//   GET_USER_INFO
// } from "../actions/userCredentials";
// import { NEW_SHOPPER } from "../actions/shoppers";
// import { NEW_ORDER } from "../actions/orders";
// const initialState = {
//   nothing: true,
//   product_list: null,
//   new_product: null,
//   user_token: null,
//   new_user: null,
//   set_shopper_id: null,
//   set_user_info: null,
//   items_in_cart: null,
//   new_shopper: null,
//   new_order: null,
//   cart: null,
//   shopper_cart: null,
//   error: null
// };

// const cartItems = (state = initialState, actions) => {
//   switch (actions.type) {
//     case GET_PRODUCTS:
//       return Object.assign({}, state, {
//         product_list: actions.payload
//       });
//     case NEW_PRODUCT:
//       return Object.assign({}, state, {
//         new_product: actions.payload
//       });
//     case LOGIN_USER:
//       return Object.assign({}, state, {
//         user_token: actions.payload
//       });
//     case CREATE_USER:
//       return Object.assign({}, state, {
//         new_user: actions.payload
//       });
//     case SET_SHOPPER_ID:
//       return Object.assign({}, state, {
//         set_shopper_id: actions.payload
//       });
//     case GET_USER_INFO:
//       return Object.assign({}, state, {
//         set_user_info: actions.payload
//       });
//     case CREATE_CART:
//       return Object.assign({}, state, {
//         cart: actions.payload
//       });
//     case ADD_ITEM_TO_CART:
//       return Object.assign({}, state, {
//         items_in_cart: actions.payload
//       });
//     case NEW_SHOPPER:
//       return Object.assign({}, state, {
//         new_shopper: actions.payload
//       });
//     case NEW_ORDER:
//       return Object.assign({}, state, {
//         new_order: actions.payload
//       });
//     case GET_SHOPPER_CART:
//       return Object.assign({}, state, {
//         shopper_cart: actions.payload
//       });
//     case "FAILURE":
//       return Object.assign({}, state, {
//         error: actions.payload
//       });
//     default:
//       return state;
//   }
// };

// export default cartItems;
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
