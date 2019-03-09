package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "shoppers")
public class Shoppers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shopperid;

    private String billingaddress;
    private String shippingaddress;
    private String phonenumber;
    private String paymentmethod;

    @OneToOne(mappedBy = "shopperxyz", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("shopperxyz")
    private User userxyz;


    @OneToMany(mappedBy = "paymentdetails")
    @JsonIgnoreProperties("carts")
    private Set<Orders> orders;

    public Shoppers() {
    }

    public User getUserxyz() {
        return userxyz;
    }

    public void setUserxyz(User userxyz) {
        this.userxyz = userxyz;
    }

    public long getShopperid() {
        return shopperid;
    }

    public void setShopperid(long shopperid) {
        this.shopperid = shopperid;
    }

    public String getBillingaddress() {
        return billingaddress;
    }

    public void setBillingaddress(String billingaddress) {
        this.billingaddress = billingaddress;
    }

    public String getShippingaddress() {
        return shippingaddress;
    }

    public void setShippingaddress(String shippingaddress) {
        this.shippingaddress = shippingaddress;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getPaymentmethod() {
        return paymentmethod;
    }

    public void setPaymentmethod(String paymentmethod) {
        this.paymentmethod = paymentmethod;
    }

    public Set<Orders> getOrders() {
        return orders;
    }

    public void setOrders(Set<Orders> orders) {
        this.orders = orders;
    }
}
