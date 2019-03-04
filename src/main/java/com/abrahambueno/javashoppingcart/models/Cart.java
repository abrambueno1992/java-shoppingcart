package com.abrahambueno.javashoppingcart.models;

package collections.shoppingcart;

public class Cart {

    List<Product> cartItems = new ArrayList<Product>();

    public void addProduct(int pid) {
        Product product = getProduct(pid);
        addToCart(product);
    }

    private Product getProduct(int pid){
        Product product = null;
        List<Product> products = new Products().getProducts(0);
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
