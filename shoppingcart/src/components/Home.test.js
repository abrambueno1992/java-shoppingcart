import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Home from './Home';

describe('Home Component Testing', () => {
    test('It should render the home component', () => {
        render(<Home/>);
    });

    test('It should render all the buttons at the home page.', () => {
        const component = render(<Home />);
        const loginButton = component.getByTestId('login-button');
        const signupButton = component.getByTestId('signup-button');
        expect(loginButton).toBeDefined();
        expect(signupButton).toBeDefined();
        
    })
})