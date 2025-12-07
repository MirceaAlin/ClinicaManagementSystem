// PatientDTO.java
package com.example.clinicabackend1.controller;

public record PatientDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String personalIdNumber,
        String address,
        String universityFaculty
) {}
