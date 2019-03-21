package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Shoppers;
import com.abrahambueno.javashoppingcart.repositories.ShopperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;
import java.net.URISyntaxException;
import java.util.List;

@Api(value = "User Controller", description = "get/post/delete")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/shoppers", produces = MediaType.APPLICATION_JSON_VALUE)
public class ShoppersController {
    @Autowired
    public ShopperRepository shoppersrepo;

    // not sure if it's a good idea
    @GetMapping("/all")
    public List<Shoppers> getAllShoppers() {
        return shoppersrepo.findAll();
    }

    @GetMapping("/{shopperid}")
    public Shoppers getShopperById(@PathVariable long shopperid) throws URISyntaxException {
        return shoppersrepo.findById(shopperid).get();
    }

    @PostMapping("/add")
    public Shoppers addShopper(@RequestBody Shoppers shopper) throws URISyntaxException {
        return shoppersrepo.save(shopper);
    }
    @ApiOperation(value = "Put the shopperid.", response = Long.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully retreived shopperid"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @PutMapping("/{shopperid}")
    public Shoppers changeShopper(@RequestBody Shoppers shopper, @PathVariable long shopperid) throws URISyntaxException {
        var updateShopper = shoppersrepo.findById(shopperid);
        if (updateShopper.isPresent()) {
            if (shopper.getBillingaddress() == null) {
                shopper.setBillingaddress(updateShopper.get().getBillingaddress());
            }
            if (shopper.getOrders() == null) {
                shopper.setOrders(updateShopper.get().getOrders());
            }
            if (shopper.getPaymentmethod() == null) {
                shopper.setPaymentmethod(updateShopper.get().getPaymentmethod());
            }
            if (shopper.getPhonenumber() == null) {
                shopper.setPhonenumber(updateShopper.get().getPhonenumber());
            }
            if (shopper.getShippingaddress() == null) {
                shopper.setShippingaddress(updateShopper.get().getShippingaddress());
            }
            shopper.setShopperid(shopperid);
            shoppersrepo.save(shopper);
            return shopper;
        } else {
            return null;
        }
    }

    @DeleteMapping("/{shopperid}")
    public String deleteShopper(@PathVariable long shopperid) throws URISyntaxException {
        var deleteShopper = shoppersrepo.findById(shopperid);
        if (deleteShopper.isPresent()) {
            shoppersrepo.deleteById(shopperid);
            return "{" + "\"shopperid\":"   + deleteShopper.get().getShopperid();
        } else {
            return null;
        }
    }
}
