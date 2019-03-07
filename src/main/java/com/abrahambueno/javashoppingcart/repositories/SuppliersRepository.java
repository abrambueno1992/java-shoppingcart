package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuppliersRepository extends JpaRepository<Suppliers, Long> {
//    Suppliers find(String supplierName);
}
