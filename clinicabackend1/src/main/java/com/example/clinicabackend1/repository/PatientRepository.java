package com.example.clinicabackend1.repository;

import com.example.clinicabackend1.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
