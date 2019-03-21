package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.Orders;
import com.abrahambueno.javashoppingcart.repositories.CartRepository;
import com.abrahambueno.javashoppingcart.repositories.OrdersRepository;
import com.abrahambueno.javashoppingcart.repositories.ShopperRepository;
import com.abrahambueno.javashoppingcart.repositories.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;
import java.net.URISyntaxException;
import java.util.List;
@Api(value = "Orders Controller", description = "get/post/delete")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/orders/", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrdersController {
    @Autowired
    public OrdersRepository ordersrepos;

    @Autowired
    public ShopperRepository shopperrepos;

    @Autowired
    public CartRepository cartrepos;

    @Autowired
    public UserDao userrepos;

    // not sure if it should be allowed
    @GetMapping("/all")
    public List<Orders> getAllOrders() {
        return ordersrepos.findAll();
    }

    @ApiOperation(value = "Get by the orderId", response = Long.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully retreived orderid"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @GetMapping("/{orderid}")
    public Orders getOrdersById(@PathVariable long orderid) throws URISyntaxException {
        return ordersrepos.findById(orderid).get();
    }

    @GetMapping("/user/{shopperid}")
    public List<Orders> getShopperOrders(@PathVariable long shopperid) {
        return ordersrepos.findAllByShopperid(shopperid);
    }
    @ApiOperation(value = "Adding a new order", response = List.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully placed order."),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @PostMapping("/add/{shopperid}/{cartid}/{total}")
    public Orders createOrder(@PathVariable long shopperid, @PathVariable long cartid, @PathVariable double total) throws URISyntaxException {
        var cart = cartrepos.findById(cartid).get();
        cart.setTotalcost(total);
        Orders newOrder = new Orders();
        newOrder.setQuantity(cart.getQuantity());
        newOrder.setTotalcost(total);
        newOrder.setDestinationaddress(shopperrepos.findById(shopperid).get().getShippingaddress());
        newOrder.setPaymentdetails(shopperrepos.findById(shopperid).get());
        newOrder.setCartstwo(cartrepos.findById(cartid).get());
//        newOrder.setShopperid(shopperid);
        cartrepos.save(cart);
        return ordersrepos.save(newOrder);
    }

    @ApiOperation(value = "Updating an order", response = List.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Your order was successfully updated."),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
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
