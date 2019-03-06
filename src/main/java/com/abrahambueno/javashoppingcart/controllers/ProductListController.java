package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.ProductList;
import com.abrahambueno.javashoppingcart.repositories.ProductListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping(value = "/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductListController {
    @Autowired
    private ProductListRepository productrepos;

    @GetMapping("/all")
    private List<ProductList> getAllProducts() {
        return productrepos.findAll();
    }

    @GetMapping("/{productid}")
    private ProductList getProductById(@PathVariable long productid) {
        return productrepos.findById(productid).get();
    }

    @PostMapping("/add")
    private ProductList addProduct(@RequestBody ProductList product) throws URISyntaxException {
        return productrepos.save(product);
    }
    @PutMapping("/update/{productid}")
    private ProductList changeProduct(@RequestBody ProductList product, @PathVariable long productid) {
        var updateProduct = productrepos.findById(productid);
        if (updateProduct.isPresent()) {
            if (product.getDescription() == null) {
                product.setDescription(updateProduct.get().getDescription());
            }
            if (product.getName() == null) {
                product.setName(updateProduct.get().getName());
            }
            if (product.getCartidtwo() == null) {
                product.setCartidtwo(updateProduct.get().getCartidtwo());
            }
//            if (product.getPrice() == null) {
//
//            }
//            if (product.getQuantity() == null) {
//
//            }
            product.setProductid(productid);
            productrepos.save(product);
            return product;
        } else {
            return null;
        }
    }
    @DeleteMapping("/delete/{productid}")
    private ProductList deleteProductById(@PathVariable long productid) throws URISyntaxException {
        var deleteProduct = productrepos.findById(productid);
        if (deleteProduct.isPresent()) {
            productrepos.deleteById(productid);
            return deleteProduct.get();
        } else {
            return null;
        }
    }
}
