export const GET_CART = "GET_CART";
export const CREATE_CART = "CREATE_CART";
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const DELETE_CART = "DELETE_CART";
export const DELETE_ITEM = "DELETE_ITEM";
export const GET_SHOPPER_CART = "GET_SHOPPER_CART";
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const DELETE_ITEM_CART = "DELETE_ITEM_CART";
const url = "http://localhost:2019/cart/";

function fetchRequest() {
  return {
    type: "REQUEST"
  };
}

function fetchSuccess(body) {
  return {
    type: GET_CART,
    payload: body
  };
}
function failedAction(ex) {
  return {
    type: "FAILURE",
    payload: ex
  };
}

export const getCartByID = id => {
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
function postSuccess(body) {
  return {
    type: CREATE_CART,
    payload: body
  };
}
export const createCart = shopperid => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`${url}createcart/${shopperid}`, {
      method: "POST", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
function postSuccessAddItem(body) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: body
  };
}
export const addItemToCart = url => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url, {
      method: "PUT", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccessAddItem(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
function deleteItemFromCartSuccess(body) {
  return {
    type: DELETE_ITEM_CART,
    payload: body
  };
}
// /delete/product/{cartid}/{productid}"
export const deleteProduct = (cartid, productid) => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`${url}delete/product/${cartid}/${productid}`, {
      method: "DELETE", // or 'PUT'
      // body: JSON.stringify(orderObject),
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(deleteItemFromCartSuccess(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
function getSuccessShopperCart(body) {
  return {
    type: GET_SHOPPER_CART,
    payload: body
  };
}

export const getShopperCart = shopperid => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`${url}shopper/${shopperid}`, {
      method: "GET", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(getSuccessShopperCart(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

function deleteSuccessCart(body) {
  return {
    type: DELETE_CART,
    payload: body
  };
}
export const deleteCart = id => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + "delete/cart/" + id, {
      method: "DELETE", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(deleteSuccessCart(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};
function deleteSuccessItem(body) {
  return {
    type: DELETE_ITEM,
    payload: body
  };
}

export const deleteItemFromCart = (cartid, productid) => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchRequest());
    return fetch(`${url}delete/product/${cartid}/${productid}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(deleteSuccessItem(body)))
      .catch(ex => dispatch(failedAction(ex)));
  };
};

export const updateItems = updatedMap => {
  return dispatch => {
    dispatch({
      type: UPDATE_ITEMS,
      payload: updatedMap
    });
  };
};
