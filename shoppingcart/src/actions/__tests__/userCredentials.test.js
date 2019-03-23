import {
  CREATE_USER,
  LOGIN_USER,
  SET_SHOPPER_ID,
  GET_USER_INFO,
  FAILURE,
  RESET_DATA,
  FAIL_GET_USER_INFO
} from "../userCredentials.js";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
import configureMockStore from "redux-mock-store"; //ES6 modules
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = "http://localhost:2019/users/";
const authURL = "http://localhost:2019/oauth/token";
describe("async cart actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("returns the proper action type", () => {});
});
