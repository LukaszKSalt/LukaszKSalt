package com.lukaszkrawiec.controller.dto;

public record NewCustomerRequest(
        String name,
        String email,
        Integer age
) {
}
