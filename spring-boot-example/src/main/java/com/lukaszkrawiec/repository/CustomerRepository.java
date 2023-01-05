package com.lukaszkrawiec.repository;

import com.lukaszkrawiec.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    List<Customer> findByName(String name);
    List<Customer> findAllByOrderById();
}
