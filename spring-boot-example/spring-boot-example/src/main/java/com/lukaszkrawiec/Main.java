package com.lukaszkrawiec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @GetMapping("/greet")
    public GreetResponse greet() {
        GreetResponse response = new GreetResponse(
                "Hello",
                List.of("Java", "Javascript", "Kotlin", "Scala"),
                new Person("Łukasz", 28, 5.43));
        return response;
    }

    record Person(String name, int age, double availableMoney){
    }
    record GreetResponse(
            String greet,
            List<String> favProgrammingLanguages,
            Person person) {
    }
}
