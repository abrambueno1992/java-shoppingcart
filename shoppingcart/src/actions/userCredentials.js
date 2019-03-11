const url = "http://localhost:2019/users/";
const authURL = "http://localhost:2019/oauth/token";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SET_SHOPPER_ID = "SET_SHOPPER_ID";
export const GET_USER_INFO = "GET_USER_INFO";
function fetchRequest() {
  return {
    type: "REQUEST"
  };
}

function failedAction(ex) {
  return {
    type: "FAILURE",
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
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postUserSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

function postLoginSuccess(body) {
  localStorage.setItem("token", body.access_token);
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

function getUserInfoSuccess(body) {
  localStorage.setItem("userid", body.id);
  localStorage.setItem("shopperid", body.shopperxyz.shopperid);
  return {
    type: GET_USER_INFO,
    payload: body
  };
}

export const getUserInfo = () => {
  const username = localStorage.getItem("username");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(getUserInfoSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
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
