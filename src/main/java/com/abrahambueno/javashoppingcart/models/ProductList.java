package com.abrahambueno.javashoppingcart.models;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ProductList {
    private final List<Product> products = new ArrayList<Product>();

    public Products () {
        this.initStoreItems();
    }

    public List<Product> getProducts(){
        return products;
    }

    public void initStoreItems(){
        String [] productNames = {"LaCroix", "Hoppy Sparkling Water", "Dasani", "Aquafina"};
        Double [] productPrice = {1.25d, 1.75d, 1.50d, 1.50d};
        Integer [] stock = {25, 5, 40, 40};
        String [] supplier = {"LaCroix", "Lagunitas", "Coca-Cola", "PepsiCo"};

        for (int i=0; i < productNames.length; i++){
            this.products.add(new Product(i+1, productNames[i], productPrice[i], supplier[i], stock[i]));
        }
    }

}
