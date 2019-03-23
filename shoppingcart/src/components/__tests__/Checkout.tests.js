import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Checkout from "../Checkout";
import Root from "../../Root";
import App from "../App";
import { isMainThread } from 'worker_threads';

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
            initialIndex={3}
            >
                <App />
            </MemoryRouter>
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
})

describe('Checkout Component Testing', () => {
    it("should contain the right number and type of buttons which is 0 in this case, because the component is conditionally rendered.", () => {
        expect(wrapped.find(".checkoutElements").length).toEqual(0); //No data, so this value is 0 
        expect(wrapped.find(".itemCard").length).toEqual(0); //No data, so this value is 0 
        // expect(wrapped.find(".plusMinus").length).toEqual(2);
    });
});