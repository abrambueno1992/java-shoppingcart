import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import ShopperProfile from "./ShopperProfile";
import Root from "../Root";
import App from "./App";
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
            initialIndex={2}
            >
                <App />
            </MemoryRouter>
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
})

describe('ShopperProfile Component Testing', () => {
    it("should contain the right number and type of buttons", () => {
        expect(wrapped.find(".billing").length).toEqual(1);
        expect(wrapped.find(".shipping").length).toEqual(1);
        expect(wrapped.find(".phone").length).toEqual(1);
        expect(wrapped.find(".payment").length).toEqual(1);
        
    });
});