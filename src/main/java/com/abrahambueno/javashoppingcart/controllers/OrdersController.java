package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Orders;
import com.abrahambueno.javashoppingcart.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping(value = "/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrdersController {
    @Autowired
    private OrdersRepository ordersrepos;
    // not sure if it should be allowed
    @GetMapping("/all")
    private List<Orders> getAllOrders() {
        return ordersrepos.findAll();
    }

    @GetMapping("/{orderid}")
    private Orders getOrdersById(@PathVariable long orderid) throws URISyntaxException {
        return ordersrepos.findById(orderid).get();
    }

    @PostMapping("/add")
    private Orders createOrder(@RequestBody Orders order) throws URISyntaxException {
        return ordersrepos.save(order);
    }
    @PutMapping("/update/{orderid}")
    private Orders changeOrder(@RequestBody Orders order, @PathVariable long orderid) throws URISyntaxException {
        var updateOrder = ordersrepos.findById(orderid);
        if (updateOrder.isPresent()) {
            if (order.getDestinationaddress() == null) {
                order.setDestinationaddress(updateOrder.get().getDestinationaddress());
            }
            if (order.getDispatchaddress() == null) {
                order.setDispatchaddress(updateOrder.get().getDispatchaddress());
            }
            if (order.getProducts() == null) {
                order.setProducts(updateOrder.get().getProducts());
            }
//            if (order.getQuantity() == null) {
//
//            }
            if (order.getShippedstatus() == null) {
                order.setShippedstatus(updateOrder.get().getShippedstatus());
            }
            if (order.getShopperidtwo() == null) {
                order.setShopperidtwo(updateOrder.get().getShopperidtwo());
            }
            order.setOrderid(orderid);
            ordersrepos.save(order);
            return order;
        } else {
            return null;
        }
    }
    @DeleteMapping("/delete/{orderid}")
    private Orders deleteOrderById(@PathVariable long orderid) throws URISyntaxException {
        var deleteOrder = ordersrepos.findById(orderid);
        if (deleteOrder.isPresent()) {
            ordersrepos.deleteById(orderid);
            return deleteOrder.get();
        } else {
            return null;
        }
    }
}
