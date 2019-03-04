package com.abrahambueno.javashoppingcart.models;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Cart {

    List<ProductList> cartItems = new ArrayList<ProductList>();

    public void addProductList(int pid) {
        ProductList product = getProductList(pid);
        addToCart(product);
    }

    private ProductList getProductList(int pid){
        ProductList product = null;
        List<ProductList> products = new ProductLists().getProductLists(0);
        for (ProductList prod: products){
            if (prod.getPid() == pid){
                product = prod;
                break;
            }
        }
        return product;
    }

    private void addToCart(ProductList product){
        cartItems.add(product);
    }

    public void removeProductList(int pid){
        ProductList prod = getProductList(pid);
        cartItems.remove(prod);
    }

    void printCartItems(){
        for(ProductList prod: cartItems){
            System.out.println(prod.getName());
        }
    }


}