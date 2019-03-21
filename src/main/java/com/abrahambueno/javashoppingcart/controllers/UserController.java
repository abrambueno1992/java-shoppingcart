package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.User;
import com.abrahambueno.javashoppingcart.repositories.ShopperRepository;
import com.abrahambueno.javashoppingcart.repositories.UserDao;
import com.abrahambueno.javashoppingcart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.*;

import java.net.URISyntaxException;
import java.util.List;
@Api(value = "User Controller", description = "get/post/delete")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController
{

    @Autowired
    // private UserService userService;
    private UserService userService;

    @Autowired
    private UserDao userrepo;

    @Autowired
    private ShopperRepository shopperrepos;
    @ApiOperation(value = "Get the user by username.", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successfully retreived userid"),
            @ApiResponse(code = 401, message = "you are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) throws URISyntaxException {
        return this.userrepo.findByUsername(username);
    }

    public UserController() {
    }

    @GetMapping({"/users"})
    public List<User> listAllUsers() {
        return this.userService.findAll();
    }

    @PostMapping({"/newuser"})
    public User addNewUser(@RequestBody User newuser) throws URISyntaxException {

        return this.userService.save(newuser);
    }
    @ApiOperation(value = "", response = Long.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully assign user to cart"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    @PostMapping({"/shopperid/{shopperid}/{userid}"})
    public User addShopperidToUser(@PathVariable long shopperid, @PathVariable long userid) {
        var updateUser = userrepo.findById(userid);
        updateUser.get().setShopperxyz(shopperrepos.findById(shopperid).get());
        userrepo.save(updateUser.get());
        return updateUser.get();
    }

    @DeleteMapping({"/delete/{id}"})
    public String deleteUserById(@PathVariable long id) {
        this.userService.delete(id);
        return "success";
    }

}