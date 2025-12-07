package com.example.clinicabackend1.controller;

import com.example.clinicabackend1.domain.Analysis;
import com.example.clinicabackend1.domain.Patient;
import com.example.clinicabackend1.service.AnalysisService;
import com.example.clinicabackend1.repository.PatientRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/analyses")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class AnalysisController {

    private final AnalysisService service;
    private final PatientRepository patientRepository;

    public AnalysisController(AnalysisService service, PatientRepository patientRepository) {
        this.service = service;
        this.patientRepository = patientRepository;
    }


    @GetMapping
    public List<Analysis> getAll() {
        return service.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Analysis> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

  
    @GetMapping("/patient/{patientId}")
    public List<Map<String, Object>> getByPatient(@PathVariable Long patientId) {
        return service.findByPatientId(patientId).stream()
                .map(a -> {
                    Map<String, Object> json = new HashMap<>();
                    json.put("id", a.getId());
                    json.put("testName", a.getTestName());
                    json.put("result", a.getResult());
                    json.put("unit", a.getUnit());
                    json.put("normalRange", a.getNormalRange());
                    json.put("testDate", a.getTestDate() != null ? a.getTestDate().toString() : null);
                    json.put("patientId", 
                        a.getPatient() != null ? a.getPatient().getId() : null
                    );
                    return json;
                })
                .toList();
    }


    @PostMapping
    public ResponseEntity<?> create(@RequestBody AnalysisRequest req) {
        Patient patient = patientRepository.findById(req.patientId()).orElse(null);
        if (patient == null)
            return ResponseEntity.badRequest().body("Patient does not exist.");

        Analysis analysis = new Analysis();
        analysis.setTestName(req.testName());
        analysis.setResult(req.result());
        analysis.setUnit(req.unit());
        analysis.setNormalRange(req.normalRange());
        analysis.setTestDate(LocalDate.parse(req.testDate()));
        analysis.setPatient(patient);

        return ResponseEntity.ok(service.save(analysis));
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}


