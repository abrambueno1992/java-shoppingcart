package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
}
