import { GET_PRODUCTS, NEW_PRODUCT } from "../actions/productList";
import { CREATE_USER, LOGIN_USER } from "../actions/userCredentials";
import _ from "lodash";
const initialState = {
  nothing: true,
  product_list: null,
  new_product: null,
  user_token: null,
  new_user: null,
  error: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        product_list: actions.payload
      });
    case NEW_PRODUCT:
      const newProductList = _.clone(state.product_list);
      newProductList.push(actions.payload);
      return Object.assign({}, state, {
        new_product: actions.payload,
        product_list: newProductList,
      });
    case LOGIN_USER:
      return Object.assign({}, state, {
        user_token: actions.payload
      });
    case CREATE_USER:
      return Object.assign({}, state, {
        new_user: actions.payload
      });
    case "FAILURE":
      return Object.assign({}, state, {
        error: actions.payload
      });
    default:
      return state;
  }
};

export default cartItems;
