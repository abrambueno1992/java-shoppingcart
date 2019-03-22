package com.abrahambueno.javashoppingcart.models;

import com.abrahambueno.javashoppingcart.repositories.SuppliersRepository;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Shopkeepers")
public class Shopkeepers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shopkeeperid;

    private String shopkeepername;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "shopkeeperid",
            joinColumns = {@JoinColumn(name = "shopkeeperid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})

    private Set<ProductList> products;

    public long getShopkeeperid() {return shopkeeperid;}

//    public void setShopkeeperid(long shopkeeperid) {this.supplierid = supplierid;}


    public void setShopkeeperid(long shopkeeperid) {
        this.shopkeeperid = shopkeeperid;
    }

    public String getShopkeepername() {return shopkeepername;}

    public void setShopkeepername(String shopkeepername) {this.shopkeepername = shopkeepername;}

    public Set<ProductList> getProducts() {return products;}

    public void setProducts(Set<ProductList> products) {this.products = products;}
}