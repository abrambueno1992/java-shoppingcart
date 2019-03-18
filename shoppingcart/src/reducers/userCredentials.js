import {
  CREATE_USER,
  LOGIN_USER,
  SET_SHOPPER_ID,
  GET_USER_INFO,
  FAILURE,
  RESET_DATA,
  FAIL_GET_USER_INFO
} from "../actions/userCredentials";

const initialState = {
  user_token: null,
  new_user: null,
  set_shopper_id: null,
  set_user_info: null,
  error: null,
  error_user_info: null
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
    case RESET_DATA:
      return Object.assign({}, state, {
        user_token: actions.payload,
        new_user: actions.payload,
        set_shopper_id: actions.payload,
        set_user_info: actions.payload,
        error: actions.payload
      });
    case FAILURE:
      return Object.assign({}, state, {
        error: actions.payload
      });
    case FAIL_GET_USER_INFO:
      return Object.assign({}, state, {
        error_user_info: actions.payload
      });
    default:
      return state;
  }
};

export default cartItems;
