package com.example.clinicabackend1.controller;

import com.example.clinicabackend1.domain.Consultation;
import com.example.clinicabackend1.domain.Doctor;
import com.example.clinicabackend1.domain.Patient;
import com.example.clinicabackend1.service.ConsultationService;
import com.example.clinicabackend1.repository.DoctorRepository;
import com.example.clinicabackend1.repository.PatientRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = {"http://localhost:5173"})
public class ConsultationController {

    private final ConsultationService consultationService;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public ConsultationController(
            ConsultationService consultationService,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository
    ) {
        this.consultationService = consultationService;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }


    @GetMapping("/patient/{patientId}")
    public List<Map<String, Object>> getByPatient(@PathVariable Long patientId) {
        return consultationService.findAll().stream()
                .filter(c -> c.getPatient() != null && patientId.equals(c.getPatient().getId()))
                .map(c -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", c.getId());
                    m.put("date", c.getDate().toString());
                    m.put("reason", c.getReason());
                    m.put("doctorName", c.getDoctor().getFirstName() + " " + c.getDoctor().getLastName());
                    m.put("status", c.getStatus());
                    return m;
                })
                .toList();
    }


@PostMapping
public ConsultationDTO create(@RequestBody ConsultationRequest req) {

    if (req.doctorId() == null || req.patientId() == null) {
        throw new IllegalArgumentException("doctorId și patientId sunt obligatorii!");
    }

    Doctor doctor = doctorRepository.findById(req.doctorId())
            .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

    Patient patient = patientRepository.findById(req.patientId())
            .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

    Consultation c = new Consultation();
    c.setDate(LocalDate.parse(req.date()));
    c.setReason(req.reason() != null ? req.reason() : "Consultație");
    c.setStatus("Programată");
    c.setDoctor(doctor);
    c.setPatient(patient);

    consultationService.save(c);

    return new ConsultationDTO(
            c.getId(),
            doctor.getId(),
            patient.getId(),
            c.getDate().toString(),
            c.getReason(),
            c.getStatus(),
            c.getNotes()
    );
}



    @GetMapping("/doctor/{doctorId}")
    public List<ConsultationDTO> getByDoctor(@PathVariable Long doctorId) {
        return consultationService.findAll().stream()
                .filter(c -> c.getDoctor() != null && doctorId.equals(c.getDoctor().getId()))
                .map(c -> new ConsultationDTO(
                        c.getId(),
                        c.getDoctor().getId(),
                        c.getPatient().getId(),
                        c.getDate().toString(),
                        c.getReason(),
                        c.getStatus(),
                        c.getNotes()
                ))
                .toList();
    }


    @PutMapping("/{id}/finish")
    public ConsultationDTO finishConsultation(@PathVariable Long id) {

        Consultation c = consultationService.findById(id).orElse(null);
        if (c == null) return null;

        c.setStatus("Finalizată");
        consultationService.save(c);

        return new ConsultationDTO(
                c.getId(),
                c.getDoctor().getId(),
                c.getPatient().getId(),
                c.getDate().toString(),
                c.getReason(),
                c.getStatus(),
                c.getNotes()
        );
    }
}

