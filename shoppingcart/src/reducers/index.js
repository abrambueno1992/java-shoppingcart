import { GET_PRODUCTS, NEW_PRODUCT } from "../actions/productList";
import { CREATE_USER, LOGIN_USER } from "../actions/userCredentials";
const initialState = {
  nothing: true,
  product_list: null,
  new_product: null,
  user_token: null,
  new_user: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        product_list: actions.payload
      });
    case NEW_PRODUCT:
      return Object.assign({}, state, {
        new_product: actions.payload
      });
    case LOGIN_USER:
      return Object.assign({}, state, {
        user_token: actions.payload
      });
    case CREATE_USER:
      return Object.assign({}, state, {
        new_user: actions.payload
      });
    default:
      return state;
  }
};

export default cartItems;
