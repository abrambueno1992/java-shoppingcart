const url = "http://localhost:2019/users/";
const authURL = "http://localhost:2019/oauth/token";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
function fetchRequest() {
  return {
    type: "REQUEST"
  };
}

function failedAction(ex) {
  return {
    type: "FAILURE",
    ex
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
  return {
    type: LOGIN_USER,
    payload: body
  };
}
// username and password in object
export const loginUser = userObject => {
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(authURL, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(userObject),
      headers: {
        "Content-Type": "application/json",
        clientId: "lambda-client",
        secret: "lambda-secret",
        authorizedGrantTypes: "password"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postLoginSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
