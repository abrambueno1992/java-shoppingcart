package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "order")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderid;

    // product id?
    @OneToMany(mappedBy = "cartidtwo")
    @JsonIgnoreProperties("cartidtwo")
    private Set<ProductList> products;




    private int quantity;
    // destination address
    private String destinationaddress;
    // dispatch address

    private String dispatchaddress;

    // should it be an object with details ?
    @ManyToOne
    @JoinColumn(name = "shopperid")
    private Shoppers shopperidtwo;
//    private String paymentdetails;

    private String shippedstatus;

    public Orders() {
    }

    public long getOrderid() {
        return orderid;
    }

    public void setOrderid(long orderid) {
        this.orderid = orderid;
    }

    public Set<ProductList> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductList> products) {
        this.products = products;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDestinationaddress() {
        return destinationaddress;
    }

    public void setDestinationaddress(String destinationaddress) {
        this.destinationaddress = destinationaddress;
    }

    public String getDispatchaddress() {
        return dispatchaddress;
    }

    public void setDispatchaddress(String dispatchaddress) {
        this.dispatchaddress = dispatchaddress;
    }

    public Shoppers getShopperidtwo() {
        return shopperidtwo;
    }

    public void setShopperidtwo(Shoppers shopperidtwo) {
        this.shopperidtwo = shopperidtwo;
    }

    public String getShippedstatus() {
        return shippedstatus;
    }

    public void setShippedstatus(String shippedstatus) {
        this.shippedstatus = shippedstatus;
    }
}
