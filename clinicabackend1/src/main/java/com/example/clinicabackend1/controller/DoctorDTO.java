// DoctorDTO.java
package com.example.clinicabackend1.controller;

public record DoctorDTO(
        Long id,
        String firstName,
        String lastName,
        String specialization,
        String department
) {}
