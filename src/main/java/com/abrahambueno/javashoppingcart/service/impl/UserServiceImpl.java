package com.abrahambueno.javashoppingcart.service.impl;

import com.abrahambueno.javashoppingcart.models.User;
import com.abrahambueno.javashoppingcart.repositories.UserDao;
import com.abrahambueno.javashoppingcart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;


@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService
{
    @Autowired
    private UserDao userrepos;

    public UserServiceImpl() {
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userrepos.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        } else {
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthority());
        }
    }

    public List<User> findAll() {
        List<User> list = new ArrayList();
        Iterator var10000 = this.userrepos.findAll().iterator();
        Objects.requireNonNull(list);
        // origial:var10000.forEachRemaining(list);
        var10000.forEachRemaining((Consumer) list);
        return list;
    }

    public void delete(long id) {
        this.userrepos.deleteById(id);
    }

    public User save(User user) {
        return (User)this.userrepos.save(user);
    }
}