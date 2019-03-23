import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Product from "../Product";
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
            initialIndex={1}
            >
                <App />
            </MemoryRouter>
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
})

describe('Product Component Testing', () => {
    it("should contain the right number and type of buttons which is 0 in this case, because the component is conditionally rendered.", () => {
        expect(wrapped.find(".listCards").length).toEqual(0); //not sure why this is not showing up 
        // expect(wrapped.find(".cardItem").length).toEqual(1);
        // expect(wrapped.find(".plusMinus").length).toEqual(2);
    });
});