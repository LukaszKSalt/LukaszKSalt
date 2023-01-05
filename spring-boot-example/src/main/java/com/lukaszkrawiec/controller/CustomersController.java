package com.lukaszkrawiec.controller;

import com.lukaszkrawiec.controller.dto.NewCustomerRequest;
import com.lukaszkrawiec.controller.dto.ReplaceCustomerRequest;
import com.lukaszkrawiec.model.Customer;
import com.lukaszkrawiec.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customers")
@CrossOrigin // todo unsafe
public class CustomersController {
    CustomerRepository customerRepository;

    public CustomersController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Customer> getCustomers() {
        return customerRepository.findAllByOrderById();
    }

    @PostMapping
    public void addCustomer(@RequestBody NewCustomerRequest request) {
        Customer customer = new Customer();
        customer.setName(request.name());
        customer.setAge(request.age());
        customer.setEmail(request.email());
        customerRepository.save(customer);
    }

    @PutMapping()
    public void updateCustomer(@RequestBody ReplaceCustomerRequest request) {
        customerRepository.findById(request.id()).ifPresent((customer -> {
            customer.setName(request.name());
            customer.setAge(request.age());
            customer.setEmail(request.email());
            customerRepository.save(customer);
        }));
    }

    @DeleteMapping("{customerID}")
    public void deleteCustomer(@PathVariable("customerID") Integer id) {
        customerRepository.deleteById(id);
    }
}
