import {
  CREATE_CART,
  ADD_ITEM_TO_CART,
  GET_SHOPPER_CART,
  UPDATE_ITEMS
} from "../actions/cart";

const initialState = {
  items_in_cart_added: null,
  cart: null,
  shopper_cart: null,
  items: new Map(),
  error: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case CREATE_CART:
      return Object.assign({}, state, {
        cart: actions.payload
      });
    case ADD_ITEM_TO_CART:
      return Object.assign({}, state, {
        items_in_cart_added: actions.payload
      });
    case GET_SHOPPER_CART:
      return Object.assign({}, state, {
        shopper_cart: actions.payload
      });
    case UPDATE_ITEMS:
      return Object.assign({}, state, {
        items: actions.payload
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
