export const GET_ORDER = "GET_ORDER";
export const CREATE_CART = "CREATE_CART";
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const DELETE_CART = "DELETE_CART";
export const NEW_ORDER = "NEW_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";

const url = "http://localhost:2019/orders/";

function fetchRequest() {
  return {
    type: "REQUEST"
  };
}

function fetchSuccess(body) {
  return {
    type: GET_ORDER,
    payload: body
  };
}
function failedAction(ex) {
  return {
    type: "FAILURE",
    payload: ex
  };
}

export const getOrderByID = id => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(fetchSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
function postSuccessNewOrder(body) {
  return {
    type: NEW_ORDER,
    payload: body
  };
}
export const addOrder = (shopperid, cartid, total) => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`${url}add/${shopperid}/${cartid}/${total}`, {
      method: "POST", // or 'PUT'
      // body: JSON.stringify(orderObject),
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccessNewOrder(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

function postSuccessUpdateOrder(body) {
  return {
    type: UPDATE_ORDER,
    payload: body
  };
}
export const updateOrder = (orderObject, id) => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + "update/" + id, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(orderObject),
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccessUpdateOrder(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
function deleteOrderScuccess(body) {
  return {
    type: DELETE_ORDER,
    payload: body
  };
}
export const deleteOrder = id => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + "delete/" + id, {
      method: "DELETE", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(deleteOrderScuccess(body))) //deleteOrderSuccess?
      .catch(ex => dispatch(failedAction(ex)));
  };
};
