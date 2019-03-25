import {
  CREATE_CART,
  ADD_ITEM_TO_CART,
  GET_SHOPPER_CART,
  DELETE_ITEM_CART
} from "../actions/cart";

const initialState = {
  items_in_cart_added: null,
  cart: null,
  shopper_cart: null,
  error: null,
  deleted_item: null
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

    case DELETE_ITEM_CART:
      return Object.assign({}, state, {
        deleted_item: actions.payload
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
