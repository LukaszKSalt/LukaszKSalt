package com.lukaszkrawiec.controller.dto;

public record ReplaceCustomerRequest(
        Integer id,
        String name,
        String email,
        Integer age
) {
}
