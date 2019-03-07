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
//    @JoinColumn(name = "cartid")
//    @JsonIgnoreProperties("products")
//    private Cart cartidtwo;

//    @ManyToMany(mappedBy = "products")
//    @JsonIgnoreProperties("products")
//    private Set<Cart> carts;

    public ProductList() {
    }

    public long getProductid() {
        return productid;
    }

    public void setProductid(long productid) {
        this.productid = productid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }



}
