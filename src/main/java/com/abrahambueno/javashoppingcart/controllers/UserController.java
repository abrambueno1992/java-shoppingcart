package com.abrahambueno.javashoppingcart.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    Private Userrepository userrepos;

    @GetMapping("/users")
    Public List<User> listAllUsers()
    {
        return userrepos.findall();
    }

    @PostMapping
    public User addNewUser(@RequestBody User newuser) throws URISyntaxException
    {
        return userrepos.save(newuser);
    }

    @DeleteMapping("/users/{id}")
    Public String deleteUserById(@PathVariable long id)
    {
        var founduser = userrepos.findById(id);
        if (founduser.isPresent())
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
