insert into shoppingcartapp.product (productid, description, name, price, quantity)
values (1, "pen", "black gel ink", 5, 200),
        (2, "pencil", "wood pencil", 0.25, 200),
        (3, "keyboard", "mechanical keyboard", 30, 250),
        (4, "mouse", "wireless mouse", 15, 250);

insert into shoppingcartapp.cartproducts(cartid, productid)
values (1, 1),
        (1, 5),
        (1, 3),
        (1, 4);
-- insert into shoppingcartapp.cartitems()

insert into shoppingcartapp.cart(cartid, quantity, shopperid, totalcost)
values (1, 0, 1, 0);

insert into shoppingcartapp.orders(orderid,totalcost, destinationaddress, dispatchaddress, quantity, shippedstatus, shopperid)
values (1,50, "1235 N Destination", "2352 N Dispatch Avenue", 3, "pending", 1);

insert into shoppingcartapp.shoppers(shopperid, billingaddress, paymentmethod, phonenumber, shippingaddress)
values (1, "123 Customer Billing Address", "Cash", "555-555-555", "123 Destination Address"),
       (2, "456 Customer Billing Address", "Cash", "555-555-555", "123 Destination Address"),
       (3, "456 Tammy Billing Address", "Cash", "555-555-555", "123 Tammy's Destination Address");

insert into shoppingcartapp.supplier(supplierid, suppliername)
values (1, "office supplies"),
      (2, "electronics"),
      (3, "music store");

insert into shoppingcartapp.supplierproducts(supplierid, productid)
values (1, 1),
        (2, 1),
        (3, 2),
        (4, 2);
insert into shoppingcartapp.user(id, password, role, username, shopperid)
values (1, "$2a$10$u2TUPddwnqppd4j9Np51W.bWlKkV0EzAHi1jj3MkyiEPK0uXbDPde", "user", "bob", 1),
        (2, "tomato", "admin", "tom", 2),
        (3, "$2a$10$XT82Y15fulr8oHnsGAveN.B59c4uyQeb9oI0tqKtp08Nk959z0aay", "user", "tammy", 3);


