package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Suppliers;
import com.abrahambueno.javashoppingcart.repositories.SuppliersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/suppliers")
public class SuppliersController
{
    @Autowired
    private SuppliersRepository supplierrepos;

    @GetMapping("/suppliers")
    public List<Suppliers> listAllSuppliers()
    {
        return supplierrepos.findAll();
    }

    @GetMapping("/suppliers/{id}")
    public



    @PostMapping
    public Suppliers addNewSupplier (@RequestBody Suppliers newsupplier) throws URISyntaxException
    {
        return supplierrepos.save(newsupplier);
    }

//    //change the supplier's information
//    @PutMapping("/supplier/{supplierid}")
//    private Supplier changeSupplierById(@RequestBody Supplier supplier, @PathVariable long cartid) throws URISyntaxException {
//        var updateSupplier = supplierrepos.findById(supplierid);
//        if (updateSupplier.isPresent()){
//            if (updateSupplier.isPresent()){
//                supplier.setSupplierid(supplierid);
//                supplierrepos.save(supplier);
//                return supplier;
//            }
//            else{
//                return null;
//            }
//        }
//    }

    @DeleteMapping("/suppliers/{supplierid}")
    public String deleteSupplierById(@PathVariable long supplierid)
    {
        var foundSupplier = supplierrepos.findById(supplierid);
        if (foundSupplier.isPresent())
        {
            supplierrepos.deleteById(supplierid);

            return "{" + "\"supplierid\":"   + foundSupplier.get().getSupplierid() +
                    ",\"usename\":" + "\"" + foundSupplier.get().getSuppliername();
        }
        else
        {
            return null;
        }
    }
}
