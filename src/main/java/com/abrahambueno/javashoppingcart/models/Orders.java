package com.abrahambueno.javashoppingcart.models;

import javax.persistence.*;

@Entity
@Table(name = "order")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderid;

    // product id?
//    @OneToMany(mappedBy = "productidtwo")
//    @JsonIgnoreProperties("productidtwo")
//    private Set<ProductList> products;

    private int quantity;
    // destination address
    private String destinationaddress;
    // dispatch address
    private String dispatchaddress;

    // should it be an object with details ?
    private String paymentdetails;

    private String shippedstatus;

    public Orders() {
    }
}
