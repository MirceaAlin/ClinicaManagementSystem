import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/student.css";

import { getDoctors } from "../api/doctors";
import type { Doctor } from "../api/doctors";

const StudentAppointments: React.FC = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const student = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));

    getDoctors().then(setDoctors);
  }, []);

  const saveLocalAppointment = (newAppointment: any) => {
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const addAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !doctorId) return;

    const res = await fetch("http://localhost:8080/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: Number(doctorId),
        patientId: student.id,
        date: date,
        reason: "Programare medicală",
      }),
    });

    if (!res.ok) {
      alert("Eroare la trimiterea în backend!");
      return;
    }

    const doc = doctors.find((d) => d.id === Number(doctorId));

    saveLocalAppointment({
      id: Date.now(),
      date,
      time,
      doctor: `${doc?.firstName} ${doc?.lastName} (${doc?.specialization})`,
    });

    setDate("");
    setTime("");
    setDoctorId("");
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

      <h1 className="student-title">Programările mele</h1>

      <div className="admin-section-card">
        <form className="admin-form" onSubmit={addAppointment}>
          <div className="admin-form-row">
            <label>
              Data
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <label>
              Ora
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          </div>

          <div className="admin-form-row">
            <label>
              Medic
              <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                <option value="">Selectează medicul</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.firstName} {d.lastName} – {d.specialization}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button className="admin-primary-btn" type="submit">
            Programează
          </button>
        </form>
      </div>

      <div className="admin-section-card">
        {appointments.length === 0 ? (
          <p>Nu ai programări.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Ora</th>
                <th>Medic</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id}>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentAppointments;
