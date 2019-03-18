const url = "http://localhost:2019/users/";
const authURL = "http://localhost:2019/oauth/token";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SET_SHOPPER_ID = "SET_SHOPPER_ID";
export const GET_USER_INFO = "GET_USER_INFO";
export const FAILURE = "FAILURE";
export const RESET_DATA = "RESET_DATA";
export const FAIL_GET_USER_INFO = "FAIL_GET_USER_INFO";
function fetchRequest() {
  return {
    type: "REQUEST"
  };
}

function failedAction(ex) {
  return {
    type: FAILURE,
    paylod: ex
  };
}
function postUserSuccess(body) {
  return {
    type: CREATE_USER,
    payload: body
  };
}

export const createNewUser = userObject => {
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + "newuser", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(userObject),
      headers: {
        Authorization: "Basic bGFtYmRhLWNsaWVudDpsYW1iZGEtc2VjcmV0",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postUserSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

function postLoginSuccess(body) {
  // if (body.error !== "invalid_grant") {
  localStorage.setItem("token", body.access_token);
  // } else {
  // localStorage.clear();
  // }
  // getUserInfo();
  return {
    type: LOGIN_USER,
    payload: body
  };
}

// username and password in object
export const loginUser = userObject => {
  console.log("Userobject", userObject.username, userObject.password);
  localStorage.setItem("username", userObject.username);
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(authURL, {
      method: "POST",
      body: `grant_type=password&username=${userObject.username}&password=${
        userObject.password
      }`,
      headers: {
        Authorization: "Basic bGFtYmRhLWNsaWVudDpsYW1iZGEtc2VjcmV0",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postLoginSuccess(body)))

      .catch(ex => dispatch(failedAction(ex)));
  };
};

function failedGetUserInfoAction(ex) {
  // console.log("error fetch: ", JSON.stringify(ex));

  return {
    type: FAIL_GET_USER_INFO,
    paylod: ex
  };
}
function getUserInfoSuccess(body) {
  console.log("set userid && shopperid");

  localStorage.setItem("userid", body.id);
  localStorage.setItem("shopperid", body.shopperxyz.shopperid);
  return {
    type: GET_USER_INFO,
    payload: body
  };
}

export const getUserInfo = () => {
  console.log("get user info");

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + username, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(getUserInfoSuccess(body)))
      .catch(ex => dispatch(failedGetUserInfoAction(ex)));
  };
};

function postSetShopperIdSuccess(body) {
  return {
    type: SET_SHOPPER_ID,
    payload: body
  };
}

export const setShopperId = () => {
  const shopperid = localStorage.getItem("shopperid");
  const userid = localStorage.getItem("userid");
  const authToken = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`${url}shopperid/${shopperid}/${userid}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSetShopperIdSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

export const resetData = () => {
  return dispatch => {
    dispatch({
      type: RESET_DATA,
      payload: null
    });
  };
};
