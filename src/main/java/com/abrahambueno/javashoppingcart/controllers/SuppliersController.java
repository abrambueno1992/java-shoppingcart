package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Suppliers;
import com.abrahambueno.javashoppingcart.repositories.SuppliersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/suppliers/", produces = MediaType.APPLICATION_JSON_VALUE)
public class SuppliersController
{
    @Autowired
    private SuppliersRepository supplierrepos;

    @GetMapping("/all")
    private List<Suppliers> listAllSuppliers()
    {
        return supplierrepos.findAll();
    }

    @GetMapping("/{supplierid}")
    private Suppliers getSupplierById(@PathVariable long supplierid) throws URISyntaxException {
        return supplierrepos.findById(supplierid).get();
    }

    @PostMapping("/add")
    private Suppliers addNewSupplier (@RequestBody Suppliers newsupplier) throws URISyntaxException
    {
        return supplierrepos.save(newsupplier);
    }

    //change the supplier's information
    @PutMapping("/{supplierid}")
    private Suppliers changeSupplierById(@RequestBody Suppliers supplier, @PathVariable long supplierid) throws URISyntaxException{
        var updateSupplier = supplierrepos.findById(supplierid);
        if (updateSupplier.isPresent()){
                if (supplier.getSuppliername() == null) {
                    supplier.setSuppliername(updateSupplier.get().getSuppliername());
                }
                if (supplier.getProducts() == null) {
                    supplier.setProducts(updateSupplier.get().getProducts());
                }
                supplier.setSupplierid(supplierid);
                supplierrepos.save(supplier);
                return supplier;
        } else {
            return null;
        }
    }

    @DeleteMapping("/suppliers/{supplierid}")
    private String deleteSupplierById(@PathVariable long supplierid)
    {
        var foundsupplier = supplierrepos.findById(supplierid);
        if (foundsupplier.isPresent())
        {
            supplierrepos.deleteById(supplierid);
            supplierrepos.deleteAllSupplierProducts(supplierid);

            return "{" + "\"supplierid\":"   + foundsupplier.get().getSupplierid() +
                    ",\"usename\":" + "\"" + foundsupplier.get().getSuppliername();
        }
        else
        {
            return null;
        }
    }
}
