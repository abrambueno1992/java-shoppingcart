import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { mount } from "enzyme";
// import 'jest-dom/extend-expect';
import OrderSummary from '../OrderSummary';
import { MemoryRouter } from "react-router";
import Root from "../../Root";
import App from "../App";

let wrapped;
beforeEach(() => {
    wrapped = mount(
        <Root>
            <MemoryRouter initialEntries = {[
                "/",
                "/productlist",
                "/shopperprofile",
                "/checkout",
                "/orders"
            ]}
            initialIndex={4}
            >
                <App />
            </MemoryRouter>
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
})

describe('Orders Component Testing', () => {
    it("should contain the right number and type of buttons", () => {
        expect(wrapped.find(".order-wrapper").length).toEqual(1);
    });
});