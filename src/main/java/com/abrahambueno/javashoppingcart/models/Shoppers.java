package com.abrahambueno.javashoppingcart.models;

import javax.persistence.*;

@Entity
@Table(name = "shopper")
public class Shoppers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String shopperid;

    private String billingaddress;
    private String shippingaddress;
    private String phonenumber;
    private String paymentmethod;

    public Shoppers() {
    }
}
