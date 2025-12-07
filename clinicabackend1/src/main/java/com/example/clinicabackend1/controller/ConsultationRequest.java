package com.example.clinicabackend1.controller;

public record ConsultationRequest(
        Long doctorId,
        Long patientId,
        String date,
        String time,
        String reason
) {}
