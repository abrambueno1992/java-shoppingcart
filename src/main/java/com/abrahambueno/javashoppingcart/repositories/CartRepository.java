package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    @Transactional
    @Modifying
    @Query(value = "insert into cartproducts (cartid, productid) values (:cartid, :productid) ", nativeQuery = true)
    void addProductToCart(long cartid, long productid);

    @Query(value = "select * from cartproducts where cartid = :cartid and productid = :productid", nativeQuery = true)
    Object checkValue(long cartid, long productid);

    @Transactional
    @Modifying
    @Query(value = "delete from cartproducts where cartid = :cartid and productid = :productid", nativeQuery = true)
    void deleteProductFromCart(long cartid, long productid);

    @Transactional
    @Modifying
    @Query(value = "delete from cartproduct where cartid = :cartid", nativeQuery = true)
    void deleteAllProductsFromCart(long cartid);
}
