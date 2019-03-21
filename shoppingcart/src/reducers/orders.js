import { NEW_ORDER, GET_ORDER_BY_SHOPPER_ID } from "../actions/orders";
const initialState = {
  new_order: null,
  error: null,
  order_history_shopper: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case NEW_ORDER:
      return Object.assign({}, state, {
        new_order: actions.payload
      });
    case GET_ORDER_BY_SHOPPER_ID:
      return Object.assign({}, state, {
        order_history_shopper: actions.payload
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
