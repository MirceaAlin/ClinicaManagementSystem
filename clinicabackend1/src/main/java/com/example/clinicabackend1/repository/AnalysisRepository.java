package com.example.clinicabackend1.repository;

import com.example.clinicabackend1.domain.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
    List<Analysis> findByPatientId(Long patientId);
}
