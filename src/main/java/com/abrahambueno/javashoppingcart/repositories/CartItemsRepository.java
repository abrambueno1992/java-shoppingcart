package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid and cartitems.shopperid = :shopperid ", nativeQuery = true)
    Object checkValuePair(long productid, long shopperid);

    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid and cartitems.shopperid = :shopperid ", nativeQuery = true)
    CartItems returnCartItem(long productid, long shopperid);
}
