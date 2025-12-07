import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/studmed-logo.jpeg";
import "../styles/admin.css";

type UserRole = "Student" | "Personal medical" | "Administrator";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Student");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load users at start
  useEffect(() => {
    const stored = localStorage.getItem("adminUsers");
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const saveUsers = (list: User[]) => {
    setUsers(list);
    localStorage.setItem("adminUsers", JSON.stringify(list));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("Student");
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editingId === null) {
      // Add user
      const newUser: User = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        role
      };
      saveUsers([...users, newUser]);
    } else {
      // Update user
      const updated = users.map(u =>
        u.id === editingId ? { ...u, name, email, role } : u
      );
      saveUsers(updated);
    }

    resetForm();
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleDelete = (id: number) => {
    saveUsers(users.filter(u => u.id !== id));
    if (editingId === id) resetForm();
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

      <h1 className="admin-title">Gestionare utilizatori</h1>

      <div className="admin-section-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <label>
              Nume complet
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ex: Ionescu Ana"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@studmed.ro"
              />
            </label>
          </div>

          <div className="admin-form-row">
            <label>
              Rol
              <select value={role} onChange={e => setRole(e.target.value as UserRole)}>
                <option value="Student">Student</option>
                <option value="Personal medical">Personal medical</option>
                <option value="Administrator">Administrator</option>
              </select>
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-primary-btn">
              {editingId === null ? "Adaugă utilizator" : "Salvează modificările"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={resetForm}
              >
                Anulează
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-section-card">
        <h2 className="admin-subtitle">Lista utilizatorilor</h2>

        {users.length === 0 ? (
          <p>Nu există utilizatori.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acțiuni</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="admin-actions-cell">
                    <button
                      className="admin-small-btn"
                      onClick={() => handleEdit(u)}
                    >
                      Editează
                    </button>
                    <button
                      className="admin-small-btn admin-delete-btn"
                      onClick={() => handleDelete(u.id)}
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
