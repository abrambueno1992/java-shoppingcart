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
    it("should contain the right number and type of buttons which is 0 in this case, because the component is conditionally rendered.", () => {
        expect(wrapped.find(".order-wrapper").length).toEqual(0);
    });
});