package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
