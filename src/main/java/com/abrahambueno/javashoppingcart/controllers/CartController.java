package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Cart;
import com.abrahambueno.javashoppingcart.models.CartItems;
import com.abrahambueno.javashoppingcart.models.ProductList;
import com.abrahambueno.javashoppingcart.models.Shoppers;
import com.abrahambueno.javashoppingcart.repositories.CartItemsRepository;
import com.abrahambueno.javashoppingcart.repositories.CartRepository;
import com.abrahambueno.javashoppingcart.repositories.ShopperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

@Api(value = "User Controller", description = "get/post/put/delete")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/cart/", produces = MediaType.APPLICATION_JSON_VALUE)
public class CartController {
    @Autowired
    public CartRepository cartrepos;
    @Autowired
    public CartItemsRepository cartitems;

    @Autowired
    public ShopperRepository shopperrepos;

    // might not allow it
    @GetMapping("/items")
    public List<Cart> getAllItems() {
        return cartrepos.findAll();
    }
    @GetMapping("/{cartid}")
    public Cart getCartById(@PathVariable long cartid) throws URISyntaxException {
        return cartrepos.findById(cartid).get();
    }
    @ApiOperation(value = "Get the shopper by shopperid.", response = Long.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully retreived shooper by shopperid"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @GetMapping("/shopper/{shopperid}")
    public Cart getCartByShopperId(@PathVariable long shopperid) throws URISyntaxException {
        return cartrepos.findByShopperid(shopperid);
    }
    @PostMapping("/createcart/{shopperid}")
    public Cart createCart(@PathVariable long shopperid) throws URISyntaxException {
        Cart newCart = new Cart();
        newCart.setShopperid(shopperid);
        Shoppers updateShopper = shopperrepos.findById(shopperid).get();
        cartrepos.save(newCart);
        updateShopper.setCurrentcartid(newCart.getCartid());
        shopperrepos.save(updateShopper);
        System.out.println("new cartid: " + newCart.getCartid());
        System.out.println("new cartid for shopper:" + updateShopper.getCurrentcartid());
        return newCart;
    }
//    @PostMapping("/add/{cartid}/{shopperid}/{productid}/{quantity}")
//    public Set<ProductList> addProductToCart(@PathVariable long cartid, @PathVariable long shopperid, @PathVariable long productid, @PathVariable int quantity) throws URISyntaxException {
//        // the cart to add the items
//        var addToCart = cartrepos.findById(cartid);
//        // check if the cart exists
//        if (addToCart.isPresent()) {
//            // check the productid to the database
//            var productPresent = cartitems.checkValuePair(productid, productid);
//            // check if the product is present in the cart
//            if (productPresent != null) {
//                // get productid
//                long productidTwo = cartitems.returnCartItem(productid).getCartitemsid();
//                // get the cartitem
//                var updateCartItems = cartitems.findById(productidTwo);
//                // update quantity on CartItems
//                updateCartItems.get().setQuantity(updateCartItems.get().getQuantity() + quantity);
//                // save cart changes
//                cartitems.save(updateCartItems.get());
//            } else {
//                // initiate new Object
//                CartItems newCartItem = new CartItems();
//                // set required variables, data
//                newCartItem.setQuantity(quantity);
//                newCartItem.setProductid(productid);
//                newCartItem.setCartidinsert(cartid);
//                newCartItem.setAsdf(addToCart.get());
//                newCartItem.setShopperid(shopperid);
//                // save CartItesm object
//                cartitems.save(newCartItem);
//            }
//            // update quantity on Cart
//            addToCart.get().setQuantity(addToCart.get().getQuantity() + quantity);
//            // save changes on Cart
//            cartrepos.save(addToCart.get());
//            Object productInCart = cartrepos.checkValue(cartid, productid);
//            if (productInCart == null) {
//                cartrepos.addProductToCart(cartid, productid);
//            }
//            return cartrepos.findById(cartid).get().getProducts();
//        } else {
//            return null;
//        }
//    }

    @ApiOperation(value = "Update the quantity.", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully updated quantity of product in a shoppers cart"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @PutMapping("/update/{cartid}/{shopperid}/{productid}/{quantity}")
    public Set<ProductList> changeProductToCart(@PathVariable long cartid, @PathVariable long shopperid, @PathVariable long productid, @PathVariable int quantity) throws URISyntaxException {
        // the cart to add the items
        var addToCart = cartrepos.findById(cartid);
        // check if the cart exists
        if (addToCart.isPresent()) {
            // check the productid to the database
            var productPresent = cartitems.checkValuePairCart(productid, cartid);
            // check if the product is present in the cart
            System.out.println("checking if cart exists: true");
            if (productPresent != null) {
                // get productid
                System.out.println("Checking if product exists: true");
                long productidTwo = cartitems.returnCartItem(productid, shopperid, cartid).getCartitemsid();
                // get the cartitem
                var updateCartItems = cartitems.findById(productidTwo);
                // update quantity on CartItems
                int olderQuantityOfProduct = updateCartItems.get().getQuantity();
                // update the quantity of the cart
                if (olderQuantityOfProduct > quantity) {
                    // quantity went down
                    int subtract = olderQuantityOfProduct - quantity;
                    // updating cart
                    addToCart.get().setQuantity(addToCart.get().getQuantity() - subtract);
                    cartrepos.save(addToCart.get());
                    // updating item in cart
                    updateCartItems.get().setQuantity(updateCartItems.get().getQuantity() - subtract);
                    cartitems.save(updateCartItems.get());
                } else if (olderQuantityOfProduct < quantity) {
                    // quantity went up
                    int add = quantity - olderQuantityOfProduct;
                    // update cart
                    addToCart.get().setQuantity(addToCart.get().getQuantity() + add);
                    cartrepos.save(addToCart.get());
                    // update item in cart
                    updateCartItems.get().setQuantity(updateCartItems.get().getQuantity() + add);
                    cartitems.save(updateCartItems.get());
                } else {
                    // no change in quantity, odd
                }
//                updateCartItems.get().setQuantity(quantity);
//                // save cart changes
//                cartitems.save(updateCartItems.get());
            } else {
                System.out.println("Checking if product exists: false");
                // initiate new Object
                CartItems newCartItem = new CartItems();
                // set required variables, data
                newCartItem.setQuantity(quantity);
                newCartItem.setProductid(productid);
                newCartItem.setCartidinsert(cartid);
                newCartItem.setAsdf(addToCart.get());
                newCartItem.setShopperid(shopperid);
                // save CartItesm object
                cartitems.save(newCartItem);
                // update quantity on Cart
                addToCart.get().setQuantity(addToCart.get().getQuantity() + quantity);
                // save changes on Cart
                cartrepos.save(addToCart.get());
            }
            Object productInCart = cartrepos.checkValue(cartid, productid);
            if (productInCart == null) {
                cartrepos.addProductToCart(cartid, productid);
            }
            return cartrepos.findById(cartid).get().getProducts();
        } else {
            System.out.println("Cart does not exist, do nothing at all NOTHING");
            return null;
        }
    }


    // deletes all items from specific cart
    @DeleteMapping("/delete/cart/{cartid}")
    public Cart deleteCartById(@PathVariable long cartid) throws URISyntaxException {
        var deleteCart = cartrepos.findById(cartid);
        if (deleteCart.isPresent()) {
            cartrepos.deleteById(cartid);
            cartrepos.deleteAllProductsFromCart(cartid);
            return deleteCart.get();
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete/product/{cartid}/{productid}")
    public Cart deleteProductFromCart(@PathVariable long cartid, @PathVariable long productid) throws URISyntaxException {
        var updateCart = cartrepos.findById(cartid);
        if (updateCart.isPresent()) {
            var checkProduct = cartitems.checkValuePairCart(productid, cartid);
            if (checkProduct != null) {
//                updateCart.get().setQuantity(updateCart.get().getQuantity() - 1);
                cartrepos.deleteProductFromCart(cartid, productid);

                cartitems.deleteProductFromCartItems(cartid, productid);
//                cartrepos.save(updateCart.get());
                return updateCart.get();

            } else {
                return  null;
            }

//            cartitems.save(cartitems.returnCartItemCart(productid, cartid));
        } else {
            return null;
        }

//        return "Success";
    }

    // update quantity of an item in the cart?
//    @PutMapping("/update/{cartid}")
//    public Cart changeCartById(@RequestBody Cart cart, @PathVariable long cartid) throws URISyntaxException {
//        var updateCart = cartrepos.findById(cartid);
//        if (updateCart.isPresent()) {
//            if (cart.getProducts() == null) {
//                cart.setProducts(updateCart.get().getProducts());
//            }
//            cart.setCartid(cartid);
//            cartrepos.save(cart);
//            return cart;
//        } else {
//            return null;
//        }
//    }
}
