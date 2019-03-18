package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.User;
import com.abrahambueno.javashoppingcart.repositories.ShopperRepository;
import com.abrahambueno.javashoppingcart.repositories.UserDao;
import com.abrahambueno.javashoppingcart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

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