import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../images/studmed-logo.jpeg";

const roles = [
  { id: "student", label: "Student – Pacient", desc: "Acces la date și analize medicale." },
  { id: "personal", label: "Personal medical", desc: "Gestionarea analizelor pacienților." },
  { id: "admin", label: "Administrator", desc: "Administrarea platformei STUDMED." }
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-navbar">
        <img src={logo} className="login-navbar-logo" alt="logo" />
        <span className="login-navbar-title">MEDSTUD</span>
      </div>

      <div className="login-center">
        <h1 className="login-main-title">Alege tipul de utilizator</h1>

        <div className="login-role-list">
          {roles.map((r) => (
            <div
              key={r.id}
              className="login-role-card"
              onClick={() => navigate(`/login/${r.id}`)}
            >
              <h3>{r.label}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
