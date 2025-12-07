// AuthController.java
package com.example.clinicabackend1.controller;

import com.example.clinicabackend1.domain.*;
import com.example.clinicabackend1.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User user = userRepository.findByEmail(req.email());
        if (user == null || !user.getPassword().equals(req.password()))
            return ResponseEntity.status(401).body("Invalid credentials");

        return ResponseEntity.ok(new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().name()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        User existing = userRepository.findByEmail(req.email());
        if (existing != null)
            return ResponseEntity.badRequest().body("Email already exists");

        Patient p = new Patient(
                req.firstName(),
                req.lastName(),
                req.email(),
                req.password(),
                Role.PATIENT,
                "",
                "",
                ""
        );

        userRepository.save(p);

        return ResponseEntity.ok(new UserDTO(
                p.getId(),
                p.getFirstName(),
                p.getLastName(),
                p.getEmail(),
                p.getRole().name()
        ));
    }
}

record LoginRequest(String email, String password) {}
record RegisterRequest(String firstName, String lastName, String email, String password) {}

record UserDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String role
) {}
