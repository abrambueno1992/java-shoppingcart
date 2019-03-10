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
  return {
    type: LOGIN_USER,
    payload: body
  };
}

// username and password in object
export const loginUser = userObject => {
  console.log("Userobject", userObject.username, userObject.password);
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(authURL, {
      method: "POST",
      // withCredentials: true,
      // credentials: "include",
      body: `grant_type=password&username=${userObject.username}&password=${
        userObject.password
      }`,
      // body: JSON.stringify(
      //   "client_id=lambda-client&client_secret=lambda-secret&grant_type_password=password&username=bob&password=newuser"
      // ),
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
