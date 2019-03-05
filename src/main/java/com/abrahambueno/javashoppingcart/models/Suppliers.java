package com.abrahambueno.javashoppingcart.models;

import javax.persistence.Entity;

@Entity
public class Suppliers {
    private Integer sid;
    private String name;

    public Suppliers () {

    }

    public Suppliers (Integer sid, String name){
        this.sid = sid;
        this.name = name;
    }

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }


}
