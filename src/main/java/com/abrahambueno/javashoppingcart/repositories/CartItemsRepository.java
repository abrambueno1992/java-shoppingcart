package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid and cartitems.shopperid = :shopperid ", nativeQuery = true)
    Object checkValuePair(long productid, long shopperid);

    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid and cartitems.cartidinsert = :cartidinsert ", nativeQuery = true)
    Object checkValuePairCart(long productid, long cartidinsert);

    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid and cartitems.shopperid = :shopperid ", nativeQuery = true)
    CartItems returnCartItem(long productid, long shopperid);

    @Query(value = "SELECT * from cartitems where cartitems.productid = :productid and cartitems.cartidinsert = :cartidinsert ", nativeQuery = true)
    CartItems returnCartItemCart(long productid, long cartidinsert);

    @Transactional
    @Modifying
    @Query(value = "delete from cartitems where cartidinsert = :cartidinsert and productid = :productid", nativeQuery = true)
    void deleteProductFromCartItems(long cartidinsert, long productid);
}
