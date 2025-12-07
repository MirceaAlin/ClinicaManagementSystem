import React, { useEffect, useState } from "react";

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const DebugUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Eroare backend");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", color: "#222" }}>
      <h1>Date din baza de date (Debug)</h1>

      {error && <p style={{ color: "red" }}>Eroare: {error}</p>}

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prenume</th>
            <th>Nume</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebugUsersPage;
