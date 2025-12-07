import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import AnalysisPage from "./pages/AnalysisPage";
import LoginPage from "./pages/LoginPage";
import RoleLoginPage from "./pages/RoleLoginPage";

import StudentDashboard from "./pages/StudentDashboard";
import StudentMedicalFile from "./pages/StudentMedicalFile";
import StudentAppointments from "./pages/StudentAppointments.tsx";
import StudentProfile from "./pages/StudentProfile";

import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ActivityLog from "./pages/ActivityLog";

import MedicalDashboard from "./pages/MedicalDashboard";
import MedicalPatientPage from "./pages/MedicalPatientPage";

import DebugUsersPage from "./pages/DebugUsersPage";

const App: React.FC = () => {
  return (
    <>
      {/* 🔥 Buton mic permanent pentru debug */}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9999,
        }}
      >
        <Link
          to="/debug-users"
          style={{
            padding: "8px 14px",
            background: "#222",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          DEBUG USERS
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:roleId" element={<RoleLoginPage />} />

        <Route path="/analyses" element={<AnalysisPage />} />

        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student/medical-file" element={<StudentMedicalFile />} />
        <Route path="/student/appointments" element={<StudentAppointments />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/logs" element={<ActivityLog />} />

        <Route path="/medical-dashboard" element={<MedicalDashboard />} />
        <Route path="/medical/patient/:id" element={<MedicalPatientPage />} />

        {/* 🔥 Noua pagină de Debug */}
        <Route path="/debug-users" element={<DebugUsersPage />} />
      </Routes>
    </>
  );
};

export default App;
