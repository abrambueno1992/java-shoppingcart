package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.Api;

import javax.persistence.*;

@Entity
@Table(name = "cartitems")
@Api(value = "Library Application", description = "The classic Library Application in CRUD")

public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartitemsid;

    private long shopperid;
    private long cartidinsert;
    private long productid;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cartid")
    @JsonIgnoreProperties({"cartitemquantity", "products", "cartid"})
    private Cart asdf;


    public CartItems() {
    }

    public long getShopperid() {
        return shopperid;
    }

    public void setShopperid(long shopperid) {
        this.shopperid = shopperid;
    }

    public long getCartitemsid() {
        return cartitemsid;
    }

    public void setCartitemsid(long cartitemsid) {
        this.cartitemsid = cartitemsid;
    }

    public long getCartidinsert() {
        return cartidinsert;
    }

    public void setCartidinsert(long cartidinsert) {
        this.cartidinsert = cartidinsert;
    }

    public Cart getAsdf() {
        return asdf;
    }

    public void setAsdf(Cart asdf) {
        this.asdf = asdf;
    }

    public long getProductid() {
        return productid;
    }

    public void setProductid(long productid) {
        this.productid = productid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
