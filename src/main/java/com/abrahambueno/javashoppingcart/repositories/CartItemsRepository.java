package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid ", nativeQuery = true)
    Object checkValuePair(long productid);

    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid ", nativeQuery = true)
    CartItems returnCartItem(long productid);
}
