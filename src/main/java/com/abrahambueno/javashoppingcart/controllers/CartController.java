package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Cart;
import com.abrahambueno.javashoppingcart.models.CartItems;
import com.abrahambueno.javashoppingcart.models.ProductList;
import com.abrahambueno.javashoppingcart.repositories.CartItemsRepository;
import com.abrahambueno.javashoppingcart.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/cart/", produces = MediaType.APPLICATION_JSON_VALUE)
public class CartController {
    @Autowired
    private CartRepository cartrepos;
    @Autowired
    private CartItemsRepository cartitems;

    // might not allow it
    @GetMapping("/items")
    private List<Cart> getAllItems() {
        return cartrepos.findAll();
    }
    @GetMapping("/{cartid}")
    private Cart getCartById(@PathVariable long cartid) throws URISyntaxException {
        return cartrepos.findById(cartid).get();
    }
    @PostMapping("/createcart")
    private Cart createCart() {
        return cartrepos.save(new Cart());
    }
    @PostMapping("/add/{cartid}")
    private ProductList addProductToCart(@RequestBody ProductList product, @PathVariable long cartid) throws URISyntaxException {
        var addToCart = cartrepos.findById(cartid);
        if (addToCart.isPresent()) {
            var productPresent = cartitems.checkValuePair(product.getProductid());
            if (productPresent != null) {
                long productidTwo = cartitems.returnCartItem(product.getProductid()).getCartitemsid();
                var updateCartItems = cartitems.findById(productidTwo);
                updateCartItems.get().setQuantity(updateCartItems.get().getQuantity() + 1);
                cartitems.save(updateCartItems.get());
            } else {
                CartItems newCartItem = new CartItems();
                newCartItem.setQuantity(1);
                newCartItem.setProductid(product.getProductid());
                newCartItem.setCartidinsert(cartid);
//                newCartItem.setAsdf(addToCart);
//                cartitems.addProductToCartItems(newCartItem.getCartitemsid(), cartid);
                cartitems.save(newCartItem);
            }
            addToCart.get().setQuantity(addToCart.get().getQuantity() + 1);
            Object productInCart = cartrepos.checkValue(cartid, product.getProductid());
            System.out.println("THIS is the product in cart" + productInCart);
            if (productInCart == null) {
                cartrepos.addProductToCart(cartid, product.getProductid());
            }
            return product;
        } else {
            return null;
        }
    }


    // deletes all items from specific cart
    @DeleteMapping("/delete/cart/{cartid}")
    private Cart deleteCartById(@PathVariable long cartid) throws URISyntaxException {
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
    private String deleteProductFromCart(@PathVariable long cartid, @PathVariable long productid) {
        var updateCart = cartrepos.findById(cartid);
        if (updateCart.isPresent()) {
            cartrepos.deleteProductFromCart(cartid, productid);
            updateCart.get().setQuantity(updateCart.get().getQuantity() - 1);
        } else {
            return null;
        }

        return "Success";
    }

    // update quantity of an item in the cart?
//    @PutMapping("/update/{cartid}")
//    private Cart changeCartById(@RequestBody Cart cart, @PathVariable long cartid) throws URISyntaxException {
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
