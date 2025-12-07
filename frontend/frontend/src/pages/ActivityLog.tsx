import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/admin.css";

interface LogEntry {
  id: number;
  timestamp: string;
  action: string;
  details: string;
}

const ActivityLog: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const storedLog = localStorage.getItem("activityLog");
    if (storedLog) {
      setLogs(JSON.parse(storedLog));
    }
  }, []);

  const clearLog = () => {
    localStorage.removeItem("activityLog");
    setLogs([]);
  };

  return (
    <div className="admin-page">
      <div className="admin-navbar">
        <div className="admin-nav-left">
          <img src={logo} className="admin-nav-logo" />
          <span className="admin-nav-title">MEDSTUD</span>
        </div>
        <button className="admin-logout" onClick={() => navigate("/login")}>
          Ieșire
        </button>
      </div>

      <h1 className="admin-title">Jurnal activități</h1>

      <div className="admin-section-card">
        {logs.length === 0 ? (
          <p>Nu există activități înregistrate.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data și ora</th>
                <th>Acțiune</th>
                <th>Detalii</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.timestamp}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {logs.length > 0 && (
          <button className="admin-secondary-btn admin-clear-log" onClick={clearLog}>
            Șterge jurnalul
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
