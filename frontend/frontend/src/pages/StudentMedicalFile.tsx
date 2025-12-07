import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/student.css";
import { getAnalysesByPatientId}  from "../api/analyses";
import type { AnalysisItem } from "../api/analyses";

const StudentMedicalFile: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<AnalysisItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const patientId = user?.id;

  useEffect(() => {
    if (!patientId) {
      setError("Nu s-a găsit ID-ul studentului.");
      return;
    }

    getAnalysesByPatientId(patientId)
      .then((data) => setRecords(data))
      .catch(() => setError("Eroare la încărcarea analizelor."));
  }, [patientId]);

  return (
    <div className="student-page">
      <div className="student-navbar">
        <div className="student-nav-left">
          <img src={logo} className="student-nav-logo" />
          <span className="student-nav-title">MEDSTUD</span>
        </div>
        <button className="student-logout" onClick={() => navigate("/login")}>
          Ieșire
        </button>
      </div>

      <h1 className="student-title">Fișa medicală</h1>

      <div className="admin-section-card" style={{ maxWidth: "900px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {records.length === 0 ? (
          <p>Nu există analize disponibile.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Rezultat</th>
                <th>Unitate</th>
                <th>Interval Normal</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.testName}</td>
                  <td>{r.result}</td>
                  <td>{r.unit}</td>
                  <td>{r.normalRange}</td>
                  <td>{r.testDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentMedicalFile;
