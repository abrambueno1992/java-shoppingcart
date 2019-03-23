import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { shallow } from "enzyme";
import {BrowserRouter as Router, Route } from "react-router-dom";
import { ExpansionPanelActions } from '@material-ui/core';

let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a router wrapper', () => {
  expect(wrapped.find(Router).length).toEqual(1);
});

it("shows the correct number of routes", () => {
  expect(wrapped.find(Route).length).toEqual(5);
});
