import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/medical.css";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const MedicalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = patients.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="medical-page">
      <div className="medical-navbar">
        <div className="medical-nav-left">
          <img src={logo} className="medical-nav-logo" />
          <span className="medical-nav-title">MEDSTUD</span>
        </div>
        <button className="medical-logout" onClick={() => navigate("/login")}>
          Ieșire
        </button>
      </div>

      <h1 className="medical-title">Selectează pacient</h1>

      <div className="medical-search-container">
        <input
          type="text"
          className="medical-search"
          placeholder="Caută pacient după nume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="patient-list">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="patient-card"
            onClick={() => navigate(`/medical/patient/${p.id}`)}
          >
            <h2>{p.firstName} {p.lastName}</h2>
            <p>{p.email}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="no-results">Niciun pacient găsit.</p>
        )}
      </div>
    </div>
  );
};

export default MedicalDashboard;
