package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Shoppers;
import com.abrahambueno.javashoppingcart.repositories.ShopperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/shoppers", produces = MediaType.APPLICATION_JSON_VALUE)
public class ShoppersController {
    @Autowired
    private ShopperRepository shoppersrepo;

    // not sure if it's a good idea
    @GetMapping("/all")
    private List<Shoppers> getAllShoppers() {
        return shoppersrepo.findAll();
    }

    @GetMapping("/{shopperid}")
    private Shoppers getShopperById(@PathVariable long shopperid) throws URISyntaxException {
        return shoppersrepo.findById(shopperid).get();
    }

    @PostMapping("/add")
    private Shoppers addShopper(@RequestBody Shoppers shopper) throws URISyntaxException {
        return shoppersrepo.save(shopper);
    }

    @PutMapping("/{shopperid}")
    private Shoppers changeShopper(@RequestBody Shoppers shopper, @PathVariable long shopperid) throws URISyntaxException {
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
    private String deleteShopper(@PathVariable long shopperid) throws URISyntaxException {
        var deleteShopper = shoppersrepo.findById(shopperid);
        if (deleteShopper.isPresent()) {
            shoppersrepo.deleteById(shopperid);
            return "{" + "\"shopperid\":"   + deleteShopper.get().getShopperid();
        } else {
            return null;
        }
    }
}
