import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/student.css";

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    }
  }, []);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = { name, email, phone };
    localStorage.setItem("studentProfile", JSON.stringify(updated));
  };

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

      <h1 className="student-title">Profilul meu</h1>

      <div className="admin-section-card" style={{ maxWidth: "800px" }}>
        <form className="admin-form" onSubmit={saveProfile}>
          <div className="admin-form-row">
            <label>
              Nume complet
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Numele complet"
              />
            </label>
          </div>

          <div className="admin-form-row">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@student.ro"
              />
            </label>
          </div>

          <div className="admin-form-row">
            <label>
              Telefon
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07xx xxx xxx"
              />
            </label>
          </div>

          <button className="admin-primary-btn" type="submit">
            Salvează
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
