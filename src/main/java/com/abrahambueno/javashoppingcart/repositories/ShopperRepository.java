package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Shoppers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopperRepository extends JpaRepository<Shoppers, Long> {
}
