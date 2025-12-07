package com.example.clinicabackend1.controller;

import com.example.clinicabackend1.service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<PatientDTO> getAllPatients() {
        return patientService.findAll()
                .stream()
                .map(p -> new PatientDTO(
                        p.getId(),
                        p.getFirstName(),
                        p.getLastName(),
                        p.getEmail(),
                        p.getPersonalIdNumber(),
                        p.getAddress(),
                        p.getUniversityFaculty()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public PatientDTO getPatient(@PathVariable Long id) {
        return patientService.findById(id)
                .map(p -> new PatientDTO(
                        p.getId(),
                        p.getFirstName(),
                        p.getLastName(),
                        p.getEmail(),
                        p.getPersonalIdNumber(),
                        p.getAddress(),
                        p.getUniversityFaculty()
                ))
                .orElse(null);
    }
}
