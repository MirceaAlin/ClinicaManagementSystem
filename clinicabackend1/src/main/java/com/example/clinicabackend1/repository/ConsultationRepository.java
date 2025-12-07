package com.example.clinicabackend1.repository;

import com.example.clinicabackend1.domain.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
}
