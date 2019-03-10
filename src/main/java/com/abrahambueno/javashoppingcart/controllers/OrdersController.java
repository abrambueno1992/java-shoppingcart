package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Orders;
import com.abrahambueno.javashoppingcart.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrdersController {
    @Autowired
    public OrdersRepository ordersrepos;
    // not sure if it should be allowed
    @GetMapping("/all")
    public List<Orders> getAllOrders() {
        return ordersrepos.findAll();
    }

    @GetMapping("/{orderid}")
    public Orders getOrdersById(@PathVariable long orderid) throws URISyntaxException {
        return ordersrepos.findById(orderid).get();
    }

    @PostMapping("/add")
    public Orders createOrder(@RequestBody Orders order) throws URISyntaxException {
        return ordersrepos.save(order);
    }
    @PutMapping("/update/{orderid}")
    public Orders changeOrder(@RequestBody Orders order, @PathVariable long orderid) throws URISyntaxException {
        var updateOrder = ordersrepos.findById(orderid);
        if (updateOrder.isPresent()) {
            if (order.getDestinationaddress() == null) {
                order.setDestinationaddress(updateOrder.get().getDestinationaddress());
            }
            if (order.getDispatchaddress() == null) {
                order.setDispatchaddress(updateOrder.get().getDispatchaddress());
            }
            if (order.getShippedstatus() == null) {
                order.setShippedstatus(updateOrder.get().getShippedstatus());
            }
            if (order.getPaymentdetails() == null) {
                order.setPaymentdetails(updateOrder.get().getPaymentdetails());
            }
//            if (order.getQuantity() == null) {
//
//            }
            order.setOrderid(orderid);
            ordersrepos.save(order);
            return order;
        } else {
            return null;
        }
    }
    @DeleteMapping("/delete/{orderid}")
    public Orders deleteOrderById(@PathVariable long orderid) throws URISyntaxException {
        var deleteOrder = ordersrepos.findById(orderid);
        if (deleteOrder.isPresent()) {
            ordersrepos.deleteById(orderid);
            return deleteOrder.get();
        } else {
            return null;
        }
    }

    public OrdersRepository getOrdersrepos() {
        return ordersrepos;
    }
}
