package com.abrahambueno.javashoppingcart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 250,unique = true)
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String role;

    public List<SimpleGrantedAuthority> getAuthority() {
        String myRole = "ROLE_" + this.role.toUpperCase();
        return Arrays.asList(new SimpleGrantedAuthority(myRole));
    }
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "shopperid")
    @JsonIgnoreProperties({"userxyz", "orders"})
    private Shoppers shopperxyz;

    public void setPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }
    public User() {
    }

    public Shoppers getShopperxyz() {
        return shopperxyz;
    }

    public void setShopperxyz(Shoppers shopperxyz) {
        this.shopperxyz = shopperxyz;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }



    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

//    public List<SimpleGrantedAuthority> getAuthority() {
//        String myRole = this.role.toUpperCase();
//        return Arrays.asList(new SimpleGrantedAuthority(myRole));
//    }
}