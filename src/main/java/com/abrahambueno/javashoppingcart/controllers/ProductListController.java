package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.ProductList;
import com.abrahambueno.javashoppingcart.repositories.ProductListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;
import java.net.URISyntaxException;
import java.util.List;
@Api(value = "User Controller", description = "get/post/delete")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductListController {
    @Autowired
    public ProductListRepository productrepos;

    @GetMapping("/all")
    public List<ProductList> getAllProducts() {
        return productrepos.findAll();
    }
    @ApiOperation(value = "Get a product by productid.", response = Long.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully retreived product by productid"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @GetMapping("/{productid}")
    public ProductList getProductById(@PathVariable long productid) {
        return productrepos.findById(productid).get();
    }

    @PostMapping("/add")
    public ProductList addProduct(@RequestBody ProductList product) throws URISyntaxException {
        return productrepos.save(product);
    }

    @ApiOperation(value = "Update a product by productid.", response = Long.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully update a product by productid"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @PutMapping("/update/{productid}")
    public ProductList changeProduct(@RequestBody ProductList product, @PathVariable long productid) {
        var updateProduct = productrepos.findById(productid);
        if (updateProduct.isPresent()) {
            if (product.getDescription() == null) {
                product.setDescription(updateProduct.get().getDescription());
            }
            if (product.getName() == null) {
                product.setName(updateProduct.get().getName());
            }
//            if (product.getPrice() == null) {
//            }
//            if (product.getQuantity() == null) {
//            }
            product.setProductid(productid);
            productrepos.save(product);
            return product;
        } else {
            return null;
        }
    }
    @DeleteMapping("/delete/{productid}")
    public ProductList deleteProductById(@PathVariable long productid) throws URISyntaxException {
        var deleteProduct = productrepos.findById(productid);
        if (deleteProduct.isPresent()) {
            productrepos.deleteById(productid);
            return deleteProduct.get();
        } else {
            return null;
        }
    }
}
