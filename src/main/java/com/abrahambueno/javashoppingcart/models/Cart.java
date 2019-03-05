package com.abrahambueno.javashoppingcart.models;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Cart {

    List<Product> cartItems = new ArrayList<Product>();

    private int quantity;

    public void addProduct(int pid) {
        Product product = getProduct(pid);
        addToCart(product);
    }

    private Product getProduct(int pid){
        Product product = null;
        List<Product> products = new Product().getProduct();
        for (Product prod: products){
            if (prod.getPid() == pid){
                product = prod;
                break;
            }
        }
        return product;
    }

    private void addToCart(Product product){
        cartItems.add(product);
    }

    public void removeProduct(int pid){
        Product prod = getProduct(pid);
        cartItems.remove(prod);
    }

    void printCartItems(){
        for(Product prod: cartItems){
            System.out.println(prod.getName());
        }
    }


}