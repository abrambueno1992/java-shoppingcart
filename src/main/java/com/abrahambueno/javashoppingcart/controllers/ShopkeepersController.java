package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Shopkeepers;
import com.abrahambueno.javashoppingcart.repositories.ShopkeepersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;
import java.net.URISyntaxException;
import java.util.List;


@Api(value = "Shopkeepers Controller", description = "get/post/put/delete")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/shopkeepers/", produces = MediaType.APPLICATION_JSON_VALUE)
public class ShopkeepersController {
    @Autowired
    public ShopkeepersRepository shopkeeperrepos;

    @GetMapping("/all")
    public List<Shopkeepers> listAllShopkeepers()
    {
        return shopkeeperrepos.findAll();
    }

    @GetMapping("/{shopkeeperid}")
    public Shopkeepers getShopkeeperById(@PathVariable long shopkeeperid) throws URISyntaxException {
        return shopkeeperrepos.findById(shopkeeperid).get();
    }

    @PostMapping("/add")
    public Shopkeepers addNewShopkeeper (@RequestBody Shopkeepers newshopkeeper) throws URISyntaxException
    {
        return shopkeeperrepos.save(newshopkeeper);
    }

    //change the supplier's information
    @PutMapping("/{shopkeeperid}")
    public Shopkeepers changeShopkeeperById(@RequestBody Shopkeepers shopkeepers, @PathVariable long shopkeeperid) throws URISyntaxException{
        var updateShopkeeper = shopkeeperrepos.findById(shopkeeperid);
        if (updateShopkeeper.isPresent()){
            if (shopkeepers.getShopkeepername() == null) {
                shopkeepers.setShopkeepername(updateShopkeeper.get().getShopkeepername());
            }
            if (shopkeepers.getProducts() == null) {
                shopkeepers.setProducts(updateShopkeeper.get().getProducts());
            }
            shopkeepers.setShopkeeperid(shopkeeperid);
            shopkeeperrepos.save(shopkeepers);
            return shopkeepers;
        } else {
            return null;
        }
    }

    @DeleteMapping("/suppliers/{shopkeeperid}")
    public String deleteShopkeeperById(@PathVariable long shopkeeperid)
    {
        var foundshopkeeper = shopkeeperrepos.findById(shopkeeperid);
        if (foundshopkeeper.isPresent())
        {
            shopkeeperrepos.deleteById(shopkeeperid);
            shopkeeperrepos.deleteAllShopkeeperSuppliers(shopkeeperid); //Not sure how the delete would work here.

            return "{" + "\"shopkeeperid\":"   + foundshopkeeper.get().getShopkeeperid() +
                    ",\"usename\":" + "\"" + foundshopkeeper.get().getShopkeepername();
        }
        else
        {
            return null;
        }
    }
}
