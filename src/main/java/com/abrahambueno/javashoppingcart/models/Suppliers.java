package com.abrahambueno.javashoppingcart.models;

import javax.persistence.*;

@Entity
@Table(name = "supplier")
public class Suppliers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supplierid;
}
