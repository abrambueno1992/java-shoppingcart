package com.abrahambueno.javashoppingcart.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "supplier")
public class Suppliers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supplierid;

    private String suppliername;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "supplierproducts",
        joinColumns = {@JoinColumn(name = "supplierid")},
            inverseJoinColumns = {@JoinColumn(name = "productid")})
    private Set<ProductList> products;

    public long getSupplierid() {
        return supplierid;
    }

    public void setSupplierid(long supplierid) {
        this.supplierid = supplierid;
    }

    public String getSuppliername() {
        return suppliername;
    }

    public void setSuppliername(String suppliername) {
        this.suppliername = suppliername;
    }

    public Set<ProductList> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductList> products) {
        this.products = products;
    }
}
