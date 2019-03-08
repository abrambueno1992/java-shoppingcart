package com.abrahambueno.javashoppingcart.controllers;

import com.abrahambueno.javashoppingcart.models.User;
import com.abrahambueno.javashoppingcart.repositories.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController
{

    @Autowired
    // private UserService userService;
    private UserDao userrepos;

    @GetMapping("/all")
    public List<User> listAllUsers()
    {
        return userrepos.findAll();
    }

    @PostMapping("/newuser")
    public User addNewUser(@RequestBody User newuser) throws URISyntaxException
    {
        return userrepos.save(newuser);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUserById(@PathVariable long id)
    {
        var foundUser = userrepos.findById(id);
        if (foundUser.isPresent())
        {
            userrepos.deleteById(id);

            return "{" + "\"id\":"   + foundUser.get().getId() +
                    ",\"usename\":" + "\"" + foundUser.get().getUsername() + "\"" +
                    ",\"role\":" + foundUser.get().getAuthority() + "}";
        }
        else
        {
            return null;
        }
    }

}