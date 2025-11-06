package domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "analyses")
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String testName;        // e.g. "Blood Test", "X-Ray", "MRI"
    private String result;          // text or numeric value
    private String unit;            // optional: "mg/dL", "mmol/L", etc.
    private String normalRange;     // e.g. "70-110 mg/dL"
    private LocalDate testDate;

    @ManyToOne
    @JoinColumn(name = "consultation_id")
    private Consultation consultation;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public Analysis() {}

    public Analysis(String testName, String result, String unit, String normalRange,
                    LocalDate testDate, Consultation consultation, Patient patient) {
        this.testName = testName;
        this.result = result;
        this.unit = unit;
        this.normalRange = normalRange;
        this.testDate = testDate;
        this.consultation = consultation;
        this.patient = patient;
    }

    // Getters and Setters
    public int getId() { return id; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getNormalRange() { return normalRange; }
    public void setNormalRange(String normalRange) { this.normalRange = normalRange; }

    public LocalDate getTestDate() { return testDate; }
    public void setTestDate(LocalDate testDate) { this.testDate = testDate; }

    public Consultation getConsultation() { return consultation; }
    public void setConsultation(Consultation consultation) { this.consultation = consultation; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
}
