package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query(value = "select * from orders where shopperid = :shopperid", nativeQuery = true)
    List<Orders> findAllByShopperid(long shopperid);
}
