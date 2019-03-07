import { GET_PRODUCTS, NEW_PRODUCT } from "../actions/productList";

const initialState = {
  nothing: true,
  product_list: null,
  new_product: null
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
    default:
      return state;
  }
};

export default cartItems;
