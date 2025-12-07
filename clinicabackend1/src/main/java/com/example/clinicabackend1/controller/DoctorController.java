package com.example.clinicabackend1.controller;

import com.example.clinicabackend1.domain.Consultation;
import com.example.clinicabackend1.domain.Doctor;
import com.example.clinicabackend1.service.ConsultationService;
import com.example.clinicabackend1.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:5173"})
public class DoctorController {

    private final DoctorService doctorService;
    private final ConsultationService consultationService;

    public DoctorController(DoctorService doctorService,
                            ConsultationService consultationService) {
        this.doctorService = doctorService;
        this.consultationService = consultationService;
    }

    @GetMapping
    public List<DoctorDTO> getAllDoctors() {
        return doctorService.findAll().stream()
                .map(d -> new DoctorDTO(
                        d.getId(),
                        d.getFirstName(),
                        d.getLastName(),
                        d.getSpecialization(),
                        d.getDepartment()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public DoctorDTO getDoctor(@PathVariable Long id) {
        Doctor d = doctorService.findById(id).orElse(null);
        if (d == null) return null;

        return new DoctorDTO(
                d.getId(),
                d.getFirstName(),
                d.getLastName(),
                d.getSpecialization(),
                d.getDepartment()
        );
    }

    @GetMapping("/{doctorId}/patients")
    public List<PatientDTO> getPatientsForDoctor(@PathVariable Long doctorId) {
        return consultationService.findAll().stream()
                .filter(c -> c.getDoctor() != null && doctorId.equals(c.getDoctor().getId()))
                .filter(c -> c.getPatient() != null)
                .map(Consultation::getPatient)
                .distinct()
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
}
