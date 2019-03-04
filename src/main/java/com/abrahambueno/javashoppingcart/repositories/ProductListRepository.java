package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.ProductList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductListRepository extends JpaRepository<ProductList, Long> {
}
