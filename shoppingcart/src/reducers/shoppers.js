import { NEW_SHOPPER } from "../actions/shoppers";
const initialState = {
  new_shopper: null,
  error: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case NEW_SHOPPER:
      return Object.assign({}, state, {
        new_shopper: actions.payload
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
