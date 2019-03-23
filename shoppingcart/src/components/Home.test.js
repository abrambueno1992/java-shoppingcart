import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { mount } from "enzyme";
// import 'jest-dom/extend-expect';
import Home from './Home';
import { MemoryRouter } from "react-router";
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
            initialIndex={0}
            >
                <App />
            </MemoryRouter>
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
})

describe('Home Component Testing', () => {
    // test('It should render the home component', () => {
    //     render(<Home/>);
    // });

    // test('It should render all the buttons at the home page.', () => {
    //     const component = render(<Home />);
    //     const loginButton = component.getByTestId('login-button');
    //     const signupButton = component.getByTestId('signup-button');
    //     expect(loginButton).toBeDefined();
    //     expect(signupButton).toBeDefined();
        
    // })
    it("should contain the right number and type of buttons", () => {
        expect(wrapped.find(".loginbutton").length).toEqual(1);
        expect(wrapped.find(".signupbutton").length).toEqual(1);
        // expect(wrapped.find(".signupCreate").length).toEqual(1);
        // expect(wrapped.find(".signupLogin").length).toEqual(1);
        
    });
});