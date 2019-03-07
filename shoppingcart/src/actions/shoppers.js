export const GET_SHOPPER ="GET_SHOPPER";
export const NEW_SHOPPER = "NEW_SHOPPER";
export const UPDATE_SHOPPER = "UPDATE_SHOPPER";
export const DELETE_SHOPPER = "DELETE_SHOPPER";


const url = "http://localhost:2019/shoppers/";

function fetchRequest() {
    return {
        type: "REQUEST"
    };
}

function fetchSuccess(body) {
    return {
        type: GET_SHOPPER,
        payload: body
    };
}

function failedAction(ex) {
    return {
        type: "FAILURE",
        ex
    };
}

export const getShopperByID = id => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(url + id)
            .then(res => res.json())
            .then(body => dispatch(fetchSuccess(body)))
            .catch(ex => dispatch(failedAction(ex)));
    };
};

function postSuccessNewShopper(body) {
    return {
        type: NEW_SHOPPER,
        payload: body
    };
}

export const addShopper = shopperObject => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(url + "add", {
            method: "POST", 
            body: JSON.stringify(shopperObject),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(body => dispatch(postSuccessNewShopper(body)))
            .catch(ex => dispatch(failedAction(ex)));
    };
};

function postSuccessUpdateShopper(body){
    return {
        type: UPDATE_SHOPPER,
        payload: body
    };
}

export const updateShopper = (shopperObject, id) => {
    return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + id, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(shopperObject),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccessUpdateShopper(body)))
      .catch(ex => dispatch(failedAction(ex)));
    };
};

function deleteShopperSuccess(body) {
    return {
        type: DELETE_SHOPPER,
        payload: body
    };
}

export const deleteShopper = id => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(url + id, {
            method: "DELETE", // or 'PUT'
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(body => dispatch(deleteShopperSuccess(body)))
            .catch(ex => dispatch(failedAction(ex)));
    };
};