This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

This is a e-commerce client application that uses a Java Springs api. This application uses authentication to track user data, such as payment method, order history, and current items in cart. It has a very simple signup, login, store items, checkout, and order history views. After the sign up, creating shopper profile, and login, you'll be taken to the products available in the store, to start shopping. You can add or remove items from your cart. Once ready and ready to checkout inside of the checkout view, you'll have another opportunity to change the quantity or remove the items. Once the order is sent, the user is redirected to the products page, and the user can look at the order in the order history page. The data is saved in real time inside the database, so the shopper can add items in one device, then login in another and add more items to the same cart they were previously on. This project has redux state management, which use various actions on each component. Authentication check is handled at every route with a higher order component withAuth that check authentication before mounting any of the components.

## Starting the Application

Run `yarn` or `npm install` at the same level as the package.json file, which is visible with the `ls` command. After installing all dependencies, run `yarn start` or `npm start` to start the application. To test the application, run `yarn test` or `npm test`.

## Components logic

Redirects between components happen with the use of React Router, and it's through the buttons that redirected to the proper component based on the user interaction. At the rott "/", you're at the Home component, which has the option of Login or Signup. If the user is not logged in, they will see the Home page to login or signup.
<br>
<br>
If the user signs up, they will be redirected to the ShopperProfile component to create a shopper profile. Once they create a shopper profile, they'll be redirected to the Product component, which renders the products in the store.
<br>
<br>
There are three main files that deal with the setup of the application such as the redux store, react router, and regular React setup. Root.js (at the root of src/) does the setup for the redux store, index.js (at the root of src/) does the React setup for the ReactDOM, and App.js (at the root of components/) does the React Router setup for the components.
<br>
<br>
The component located at the root path "/" is the Home component, which launches the redux actions in the withAuth to check for authentication, which has actions that dispatch and return state to the component. Based on the data, it redirects to the proper component if there are credentials present, or redirects to the Home component at "/".
<br>
<br>
The component located at the root path "/productlist" is the Product component, which launches the redux actions in the withAuth to check for authentication, which has actions that dispatch and return state to the component. Based on the data, it redirects to the proper component if there are credentials present, or redirects to the Home component at "/". If withAuth validates authentication, it will launch the actions `this.props.getShopperCart()`, `this.props.getUserInfo()` (actually launced from `withAut`), and `this.props.getProductList()` (actually launced from `withAut`) to get the products of the store and any items in the shopper's cart (if any). Once the data is rendered, and everything is set, state is changed with the proper actions being launched. Adding or removing items from the cart launches `this.props.addItemToCart()`, this actions actually updates the quantity of the product (add or subtracts from cart, it does both). The state of the component and the store is handled with logic inside of the `componentDidUpdate()` React life cycle.
<br>
<br>
The component located at the root path "/shopperprofile" is the ShopperProfile component, which launches the redux actions in the withAuth to check for authentication, which has actions that dispatch and return state to the component. Based on the data, it redirects to the proper component if there are credentials present, or redirects to the Home component at "/". If withAuth validates authentication, it will launch the actions, `this.props.getUserInfo()` (actually launced from `withAut`) to get user information. Once the user's shopper profile is created, they will be redirected to the "/productlist" route.
<br>
<br>
The component located at the root path "/checkout" is the Checkout component, which launches the redux actions in the withAuth to check for authentication, which has actions that dispatch and return state to the component. Based on the data, it redirects to the proper component if there are credentials present, or redirects to the Home component at "/". If withAuth validates authentication, it will launch the actions `this.props.getShopperCart()`, `this.props.getUserInfo()` (actually launced from `withAut`), and `this.props.getProductList()` (actually launced from `withAut`) to get the products of the store and any items in the shopper's cart (if any). Once the data is rendered, and everything is set, state is changed with the proper actions being launched. Adding or removing items from the cart launches `this.props.addItemToCart()`, this actions actually updates the quantity of the product (add or subtracts from cart, it does both). The state of the component and the store is handled with logic inside of the `componentDidUpdate()` React life cycle.
<br>
<br>
The component located at the root path "/orders" is the OrderSummary component, which launches the redux actions in the withAuth to check for authentication, which has actions that dispatch and return state to the component. Based on the data, it redirects to the proper component if there are credentials present, or redirects to the Home component at "/". If withAuth validates authentication, it will launch the actions `this.props.getShopperCart()`, `this.props.getUserInfo()` (actually launced from `withAut`), and `this.props.getProductList()` (actually launced from `withAut`) to get the products of the store and any items in the shopper's cart (if any). This component only renders data from the server, so there's no complex logic in the `componentDidUpdate()` React life cycle. It gets the data, and renders the proper view, based on user interaction.
<br>
<br>

## Redux Actions, State, and tests

The redux store initial state is the following, default is null
<br>
<br>
`cart` initial state:

```
  items_in_cart_added: null,
  cart: null,
  shopper_cart: null,
  error: null,
  deleted_item: null

```

<br>
<br>

`orders` initial state:

```
  new_order: null,
  error: null,
  order_history_shopper: null

```

<br>
<br>

`productList` initial state:

```

product_list: null,
new_product: null,
error: null

```

<br>
<br>

`shoppers` initial state:

```

new_shopper: null,
error: null

```

<br>
<br>

`suppliers` initial state:

```

No state used for the suppliers
Functionality coming soon, for shop owners, business owners having their products on the store.

```

<br>
<br>

`userCredentials` initial state:

```

user_token: null,
new_user: null,
set_shopper_id: null,
set_user_info: null,
error: null,
error_user_info: null

```

The redux store state is populated with data after the following actions are dispatched. Each of these actions are dipatched inside of the components that need the data, and they're only dispatched if there's no data (null).
<br>
<br>
`cart` Action methods

```

```

<br>
<br>
`orders` Action methods

```

```

<br>
<br>
`productList` Action methods

```

```

<br>
<br>
`shoppers` Action methods

```

```

<br>
<br>
`suppliers` Action methods

```

```

<br>
<br>
`userCredentials` Action methods

```

```

```

```
