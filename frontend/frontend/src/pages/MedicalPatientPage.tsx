import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/medical-patient.css";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  personalIdNumber: string;
  address: string;
  universityFaculty: string;
}

interface Analysis {
  id: number;
  testName: string;
  result: string;
  unit: string;
  normalRange: string;
  testDate: string;
}

interface Consultation {
  id: number;
  date: string;
  reason: string;
  diagnosis: string;
  notes: string;
  recommendations: string;
  status: string;
  doctorName: string;
}

const MedicalPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const patientId = Number(id);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {

    fetch(`http://localhost:8080/api/patients/${patientId}`)
      .then((res) => res.json())
      .then((data) => setPatient(data));

    fetch(`http://localhost:8080/api/analyses/patient/${patientId}`)
      .then((res) => res.json())
      .then((data) => setAnalyses(data));

    fetch(`http://localhost:8080/api/consultations/patient/${patientId}`)
      .then((res) => res.json())
      .then((data) => setConsultations(data));
  }, [patientId]);

  // Extract sections from consultations
  const diagnostics = consultations
    .filter((c) => c.diagnosis && c.diagnosis.trim() !== "")
    .map((c) => ({ date: c.date, value: c.diagnosis, id: c.id }));

  const observations = consultations
    .filter((c) => c.notes && c.notes.trim() !== "")
    .map((c) => ({ date: c.date, value: c.notes, id: c.id }));

  const recommendations = consultations
    .filter((c) => c.recommendations && c.recommendations.trim() !== "")
    .map((c) => ({ date: c.date, value: c.recommendations, id: c.id }));

  const appointments = consultations
    .filter((c) => c.status === "Programată")
    .map((c) => ({
      id: c.id,
      date: c.date,
      doctor: c.doctorName,
    }));

  return (
    <div className="medical-patient-page">
      <div className="medical-navbar">
        <div className="medical-nav-left">
          <img src={logo} className="medical-nav-logo" />
          <span className="medical-nav-title">MEDSTUD</span>
        </div>
        <button className="medical-logout" onClick={() => navigate("/medical-dashboard")}>
          Înapoi
        </button>
      </div>

      {patient && (
        <h1 className="medical-patient-title">
          {patient.firstName} {patient.lastName}
        </h1>
      )}

      {/* ---- FISA MEDICALA ---- */}
      <div className="medical-section">
        <h2>Fișa medicală</h2>
        {analyses.length === 0 ? (
          <p className="empty">Nu există fișe medicale.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Rezultat</th>
                <th>Interval normal</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((a) => (
                <tr key={a.id}>
                  <td>{a.testName}</td>
                  <td>{a.result} {a.unit}</td>
                  <td>{a.normalRange}</td>
                  <td>{a.testDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---- DIAGNOSTICE ---- */}
      <div className="medical-section">
        <h2>Diagnostice</h2>
        {diagnostics.length === 0 ? (
          <p className="empty">Nu există diagnostice.</p>
        ) : (
          <ul>
            {diagnostics.map((d) => (
              <li key={d.id}>{d.date} — {d.value}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ---- OBSERVATII ---- */}
      <div className="medical-section">
        <h2>Observații medicale</h2>
        {observations.length === 0 ? (
          <p className="empty">Nu există observații.</p>
        ) : (
          <ul>
            {observations.map((o) => (
              <li key={o.id}>{o.date} — {o.value}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ---- RECOMANDARI ---- */}
      <div className="medical-section">
        <h2>Recomandări</h2>
        {recommendations.length === 0 ? (
          <p className="empty">Nu există recomandări.</p>
        ) : (
          <ul>
            {recommendations.map((r) => (
              <li key={r.id}>{r.date} — {r.value}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ---- PROGRAMARI ---- */}
      <div className="medical-section">
        <h2>Programări</h2>
        {appointments.length === 0 ? (
          <p className="empty">Nu există programări.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Medic</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MedicalPatientPage;
