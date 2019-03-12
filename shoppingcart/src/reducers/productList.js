import { GET_PRODUCTS, NEW_PRODUCT } from "../actions/productList";

const initialState = {
  product_list: null,
  new_product: null,
  error: null
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
    case "FAILURE":
      return Object.assign({}, state, {
        error: actions.payload
      });
    default:
      return state;
  }
};

export default cartItems;
