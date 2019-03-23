import {
  GET_ORDER,
  CREATE_CART,
  ADD_ITEM_TO_CART,
  DELETE_CART,
  NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_ORDER_BY_SHOPPER_ID
} from "../orders";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
import configureMockStore from "redux-mock-store"; //ES6 modules
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = "http://localhost:2019/orders/";
describe("async cart actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("returns the proper action type", () => {});
});
