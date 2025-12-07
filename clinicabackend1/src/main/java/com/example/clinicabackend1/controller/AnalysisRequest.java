// AnalysisRequest.java
package com.example.clinicabackend1.controller;

public record AnalysisRequest(
        String testName,
        String result,
        String unit,
        String normalRange,
        String testDate,
        Long patientId
) {}
