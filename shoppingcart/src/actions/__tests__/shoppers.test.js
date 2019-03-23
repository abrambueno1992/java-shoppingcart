import {
  GET_SHOPPER,
  NEW_SHOPPER,
  UPDATE_SHOPPER,
  DELETE_SHOPPER
} from "../shoppers";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
import configureMockStore from "redux-mock-store"; //ES6 modules
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = "http://localhost:2019/shoppers/";
describe("async cart actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("returns the proper action type", () => {});
});
