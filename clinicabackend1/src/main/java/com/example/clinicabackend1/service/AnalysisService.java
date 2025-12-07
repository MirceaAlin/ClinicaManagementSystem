package com.example.clinicabackend1.service;

import com.example.clinicabackend1.domain.Analysis;
import com.example.clinicabackend1.repository.AnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnalysisService {

    private final AnalysisRepository repository;

    public AnalysisService(AnalysisRepository repository) {
        this.repository = repository;
    }

    public List<Analysis> findAll() {
        return repository.findAll();
    }

    public Optional<Analysis> findById(Long id) {   // <-- LONG
        return repository.findById(id);
    }

    public List<Analysis> findByPatientId(Long patientId) { // <-- LONG
        return repository.findByPatientId(patientId);
    }

    public Analysis save(Analysis analysis) {
        return repository.save(analysis);
    }

    public void delete(Long id) { // <-- LONG
        repository.deleteById(id);
    }
}
