package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartid;

    private int quantity = 0;

    @OneToMany(mappedBy = "cartidtwo")
    @JsonIgnoreProperties("cartidtwo")
    private Set<ProductList> products;

    public Cart() {
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