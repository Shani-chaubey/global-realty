"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520, padding: "60px 20px" }}>
      <h2 className="mb-20">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="box-fieldset mb-16">
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </fieldset>
        <fieldset className="box-fieldset mb-20">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </fieldset>

        {error ? <p style={{ color: "#d93025", marginBottom: 16 }}>{error}</p> : null}

        <button type="submit" className="tf-btn bg-color-primary pd-10" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
