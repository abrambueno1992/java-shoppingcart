package com.abrahambueno.javashoppingcart.models;

import javax.persistence.*;


@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartid;

//    List<ProductList> cartItems = new ArrayList<ProductList>();

//    public void addProductList(long pid) {
//        ProductList product = getProductList(pid);
//        addToCart(product);
//    }

//    private ProductList getProductList(long pid){
//        ProductList product = null;
//        List<ProductList> products = new ProductLists().getProductLists(0);
//        for (ProductList prod: products){
//            if (prod.getPid() == pid){
//                product = prod;
//                break;
//            }
//        }
//        return product;
//    }

//    private void addToCart(ProductList product){
//        cartItems.add(product);
//    }
//
//    public void removeProductList(long pid){
//        ProductList prod = getProductList(pid);
//        cartItems.remove(prod);
//    }
//
//    void printCartItems(){
//        for(ProductList prod: cartItems){
//            System.out.println(prod.getName());
//        }
//    }


}