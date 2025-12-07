package com.example.clinicabackend1.repository;

import com.example.clinicabackend1.domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
