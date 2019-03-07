package com.abrahambueno.javashoppingcart.repositories;

import com.abrahambueno.javashoppingcart.models.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SuppliersRepository extends JpaRepository<Suppliers, Long> {
    @Query(value = "delete from supplierproducts where  supplierid = :supplierid", nativeQuery = true)
    void deleteAllSupplierProducts(long supplierid);

}
