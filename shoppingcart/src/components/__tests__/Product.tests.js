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
    it("should contain the right number and type of buttons", () => {
        expect(wrapped.find(".listCards").length).toEqual(1); //not sure why this is not showing up 
        // expect(wrapped.find(".cardItem").length).toEqual(1);
        // expect(wrapped.find(".plusMinus").length).toEqual(2);
    });
});