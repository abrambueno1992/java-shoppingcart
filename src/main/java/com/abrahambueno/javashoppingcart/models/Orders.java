package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderid;

    // product id?
//    @OneToMany(mappedBy = "orders")
//    @JsonIgnoreProperties("orders")
//    private Set<Cart> carts = new HashSet<>();




    private int quantity;

    private double totalcost;
    // destination address
    private String destinationaddress;
    // dispatch address

    private String dispatchaddress = "123 Business Street";

    // should it be an object with details ?
    @ManyToOne
    @JoinColumn(name = "shopperid")
    @JsonIgnoreProperties("orders")
    private Shoppers paymentdetails;



//    private String paymentdetails;

    private String shippedstatus = "processing";

    public Orders() {
    }

    public long getOrderid() {
        return orderid;
    }


    public double getTotalcost() {
        return totalcost;
    }

    public void setTotalcost(double totalcost) {
        this.totalcost = totalcost;
    }

    public void setOrderid(long orderid) {
        this.orderid = orderid;
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

    public String getShippedstatus() {
        return shippedstatus;
    }

    public void setShippedstatus(String shippedstatus) {
        this.shippedstatus = shippedstatus;
    }

    public Shoppers getPaymentdetails() {
        return paymentdetails;
    }

    public void setPaymentdetails(Shoppers paymentdetails) {
        this.paymentdetails = paymentdetails;
    }
}
