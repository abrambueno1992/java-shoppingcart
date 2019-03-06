package com.abrahambueno.javashoppingcart.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.security.PublicKey;

@RestController
@RequestMapping("/suppliers")
public class SuppliersController
{
    @Autowired
    Private Supplierepository supplierrepos;

    @GetMapping("/suppliers")
    Public List<User> listAllSuppliers()
    {
        return supplierrepos.findall();
    }

    @PostMapping
    public User addNewSupplier (@RequestBody Supplier newsupplier) throws URISyntaxException
    {
        return supplierrepos.save(newsupplier);
    }

    @DeleteMapping("/suppliers/{supplierid}")
    Public String deleteSupplierById(@PathVariable long supplierid)
    {
        var foundsupplier = supplierrepos.findById(supplierid);
        if (foundsupplier.isPresent())
        {
            supplierrepos.deleteById(supplierid);

            return "{" + "\"supplierid\":"   + foundSupplier.get().getId() +
                    ",\"usename\":" + "\"" + foundSupplier.get().getUsername();
        }
        else
        {
            return null;
        }
    }
}
