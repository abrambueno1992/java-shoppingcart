export const GET_SUPPLIER = "GET_SUPPLIER";
export const NEW_SUPPLIER = "NEW_SUPPLIER";
export const UPDATE_SUPPLIER = "UPDATE_SUPPLIER" ;
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";

const url = "http://localhost:2019/suppliers/";

function fetchRequest() {
    return {
        type: "REQUEST "
    };
}

function fetchSuccess(body) {
    return {
        type: GET_SUPPLIER,
        payload: body
    };
}

function failedAction(ex) {
    return {
        type: "FAILURE",
        ex
    };
}

export const getSupplierByID = id => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(url + id)
            .then(res => res.json())
            .then(body => dispatch(fetchSuccess(body)))
            .catch(ex => dispatch(failedAction(ex)));
    };
};

function postSuccessNewSupplier(body) {
    return {
        type: NEW_SUPPLIER,
        payload: body
    };
}

export const addShopper = shopperObject => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(url + "add", {
            method: "POST", 
            body: JSON.stringify(supplierObject),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(body => dispatch(postSuccessNewSupplier(body)))
            .catch(ex => dispatch(failedAction(ex)));
    };
};

function postSuccessUpdateSupplier(body){
    return {
        type: UPDATE_SUPPLIER,
        payload: body
    };
}

export const updateSupplier = (supplierObject, id) => {
    return dispatch => {
    dispatch(fetchRequest());
    return fetch(url + id, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(supplierObject),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(body => dispatch(postSuccessUpdateSupplier(body)))
      .catch(ex => dispatch(failedAction(ex)));
    };
};

function deleteSupplierSuccess(body) {
    return {
        type: DELETE_SUPPLIER,
        payload: body
    };
}

export const deleteSupplier = id => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(url + id, {
            method: "DELETE", // or 'PUT'
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(body => dispatch(deleteSupplierSuccess(body)))
            .catch(ex => dispatch(failedAction(ex)));
    };
};