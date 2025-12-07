package com.example.clinicabackend1.controller;

public record ConsultationDTO(
        Long id,
        Long doctorId,
        Long patientId,
        String date,
        String reason,
        String status,
        String notes
) {}
