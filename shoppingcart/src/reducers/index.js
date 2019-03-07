import { GET_PRODUCTS } from "../actions/productList";

const initialState = {
  nothing: true,
  product_list: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        product_list: actions.payload
      });
    default:
      return state;
  }
};

export default cartItems;
