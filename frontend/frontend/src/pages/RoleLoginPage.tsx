import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/login.css";

import { loginRequest } from "../api/auth";

const RoleLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const user = await loginRequest(email, password);


      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.role === "PATIENT" && roleId === "student")
        navigate("/student-dashboard");
      else if (user.role === "DOCTOR" && roleId === "personal")
        navigate("/medical-dashboard");
      else if (user.role === "ADMIN" && roleId === "admin")
        navigate("/admin-dashboard");
      else {
        alert("Nu ai acces la acest tip de cont!");
      }
    } catch (err) {
      alert("Email sau parolă greșită");
    }
  };

  return (
    <div className="login-page">
      <div className="login-navbar">
        <img src={logo} className="login-navbar-logo" />
        <span className="login-navbar-title">MEDSTUD</span>
      </div>

      <div className="login-center">
        <button className="login-back" onClick={() => navigate(-1)}>
          ← Înapoi
        </button>

        <h1 className="login-main-title">Conectează-te</h1>

        <div className="login-form-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field-glass">
              <span>Adresa de e-mail</span>
              <input
                type="email"
                value={email}
                placeholder="exemplu@studmed.ro"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="login-field-glass">
              <span>Parolă</span>
              <div className="password-row">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Introduceți parola"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-glass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </label>

            <div className="login-forgot-link">Am uitat parola</div>

            <button type="submit" className="login-submit-glass-btn">
              Conectează-te
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleLoginPage;
