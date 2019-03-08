package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.Api;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "cart")
@Api(value = "Cart Application", description = "The Cart Application in CRUD")

public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartid;

    //set quantity from controllers
    private int quantity = 0;


    @ManyToMany
    @JoinTable(name = "cartproducts",
        joinColumns = {@JoinColumn(name = "cartid")},
        inverseJoinColumns = {@JoinColumn(name = "productid")})
//    @JsonIgnoreProperties("carts")
    private Set<ProductList> products = new HashSet<>();

    @OneToMany(mappedBy = "asdf")
    @JsonIgnoreProperties("asdf")
    private Set<CartItems> cartitemquantity = new HashSet<>();


    //    @OneToMany(mappedBy = "cartidtwo")
//    @JsonIgnoreProperties("cartidtwo")
//    private Set<ProductList> products;
    public Cart() {
        if (products != null) {
            this.quantity = products.size();
        }
    }


    public Set<CartItems> getCartitemquantity() {
        return cartitemquantity;
    }

    public void setCartitemquantity(Set<CartItems> cartitemquantity) {
        this.cartitemquantity = cartitemquantity;
    }

    public Set<ProductList> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductList> products) {
        this.products = products;
    }

    public long getCartid() {
        return cartid;
    }

    public void setCartid(long cartid) {
        this.cartid = cartid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }



}