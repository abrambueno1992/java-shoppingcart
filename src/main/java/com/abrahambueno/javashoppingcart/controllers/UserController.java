package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.User;
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

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
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

    @DeleteMapping({"/delete/{id}"})
    public String deleteUserById(@PathVariable long id) {
        this.userService.delete(id);
        return "success";
    }

}