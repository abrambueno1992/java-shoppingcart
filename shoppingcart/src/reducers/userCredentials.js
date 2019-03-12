import {
  CREATE_USER,
  LOGIN_USER,
  SET_SHOPPER_ID,
  GET_USER_INFO,
  FAILURE
} from "../actions/userCredentials";

const initialState = {
  user_token: null,
  new_user: null,
  set_shopper_id: null,
  set_user_info: null,
  error: null
};

const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        user_token: actions.payload
      });
    case CREATE_USER:
      return Object.assign({}, state, {
        new_user: actions.payload
      });
    case SET_SHOPPER_ID:
      return Object.assign({}, state, {
        set_shopper_id: actions.payload
      });
    case GET_USER_INFO:
      return Object.assign({}, state, {
        set_user_info: actions.payload
      });
    case FAILURE:
      return Object.assign({}, state, {
        error: actions.payload
      });
    default:
      return state;
  }
};

export default cartItems;
