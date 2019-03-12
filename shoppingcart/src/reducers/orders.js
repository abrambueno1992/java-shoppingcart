import { NEW_ORDER } from "../actions/orders";
const initialState = {
  new_order: null,
  error: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case NEW_ORDER:
      return Object.assign({}, state, {
        new_order: actions.payload
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
