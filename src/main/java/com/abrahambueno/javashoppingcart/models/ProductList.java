package com.abrahambueno.javashoppingcart.models;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class ProductList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productid;

    private String name;
    private String description;
    private float price;
    private int quantity;

//    @ManyToOne
//    @JoinColumn(name = "productid")
//    private ProductList productidtwo;

    public ProductList() {
    }
}
