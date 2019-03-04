package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
