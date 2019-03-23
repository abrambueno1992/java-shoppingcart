import {
  GET_CART,
  CREATE_CART,
  ADD_ITEM_TO_CART,
  DELETE_CART,
  DELETE_ITEM,
  GET_SHOPPER_CART,
  UPDATE_ITEMS,
  DELETE_ITEM_CART
} from "../cart.js";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
import configureMockStore from "redux-mock-store"; //ES6 modules
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = "http://localhost:2019/cart/";
describe("async cart actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("returns the proper action type", () => {});
});
