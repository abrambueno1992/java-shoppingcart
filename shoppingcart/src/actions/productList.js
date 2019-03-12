export const GET_PRODUCTS = "GET_PRODUCTS";
export const NEW_PRODUCT = "NEW_PRODUCT";
const url = "http://localhost:2019/products/";

function fetchTodosRequest() {
  return {
    type: "GET_REQUEST"
  };
}

function fetchTodosSuccess(body) {
  return {
    type: GET_PRODUCTS,
    payload: body
  };
}
function failedAction(ex) {
  return {
    type: "FAILURE",
    payload: ex
  };
}

export const getProductList = () => {
  return dispatch => {
    dispatch(fetchTodosRequest());
    return fetch(url + "all")
      .then(res => res.json())
      .then(body => dispatch(fetchTodosSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

function postRequest() {
  return {
    type: "GET_REQUEST"
  };
}

function postSuccess(body) {
  console.log("Success: ", body);
  return {
    type: NEW_PRODUCT,
    payload: body
  };
}
// function fetchTodosFailure(ex) {
//   return {
//     type: "FAILURE",
//     ex
//   };
// }

export const createNewProduct = productObject => {
  return dispatch => {
    dispatch(postRequest());
    return fetch(url + "add", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(productObject), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
