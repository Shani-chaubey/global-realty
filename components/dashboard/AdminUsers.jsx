"use client";

import { useEffect, useState } from "react";
import "./AdminUsers.css";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getInitials = (email) => {
  if (!email) return "?";
  const [local] = email.split("@");
  const parts = local.split(/[._-]/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : local.slice(0, 2).toUpperCase();
};

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("list");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pendingDeleteUsername, setPendingDeleteUsername] = useState("");

  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [editAdmin, setEditAdmin] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const clearAlerts = () => {
    setMessage("");
    setError("");
  };

  const ensureEmail = (value) => EMAIL_REGEX.test(value);

  const loadAdmins = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to load admins");
        return;
      }

      setAdmins(data.admins || []);
    } catch {
      setError("Unable to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    clearAlerts();

    if (!ensureEmail(newAdmin.username)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to create admin");
        return;
      }

      setMessage("Admin created successfully");
      setNewAdmin({ username: "", password: "", role: "admin" });
      setActiveTab("list");
      await loadAdmins();
    } catch {
      setError("Unable to create admin");
    }
  };

  const handleUpdateAdmin = async (event) => {
    event.preventDefault();
    clearAlerts();

    if (!editAdmin.username) {
      setError("Select an admin to edit");
      return;
    }

    if (!ensureEmail(editAdmin.username)) {
      setError("Please select a valid admin email.");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editAdmin),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to update admin");
        return;
      }

      setMessage("Admin updated successfully");
      setEditAdmin({ username: "", password: "", role: "admin" });
      setActiveTab("list");
      await loadAdmins();
    } catch {
      setError("Unable to update admin");
    }
  };

  const handleDeleteAdmin = async (username) => {
    setPendingDeleteUsername(username);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteUsername) {
      return;
    }

    setDeleteLoading(true);
    clearAlerts();

    try {
      const res = await fetch(
        `/api/admin/users?username=${encodeURIComponent(pendingDeleteUsername)}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to delete admin");
        return;
      }

      setMessage("Admin deleted successfully");
      setPendingDeleteUsername("");
      await loadAdmins();
    } catch {
      setError("Unable to delete admin");
    } finally {
      setDeleteLoading(false);
    }
  };

  const tabs = [
    { id: "list", label: "Admin List" },
    { id: "add", label: "+ Add Admin" },
    { id: "edit", label: "Edit Admin" },
  ];

  return (
    <div className="main-content w-100">
      <div className="main-content-inner wrap-dashboard-content">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="admin-users-page">
          <div className="admin-users-container">
            <div className="admin-users-header">
              <div>
                <h1 className="admin-users-header-title">Admin Management</h1>
                <p className="admin-users-header-sub">
                  Manage admin accounts and permissions
                </p>
              </div>
              <div className="admin-users-counter">
                {admins.length} admin{admins.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="admin-users-card">
              <div className="admin-users-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`admin-users-tab ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      clearAlerts();
                    }}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="admin-users-body">
                {message ? (
                  <div className="admin-users-toast success">
                    <div className="admin-users-dot success" />
                    {message}
                  </div>
                ) : null}

                {error ? (
                  <div className="admin-users-toast error">
                    <div className="admin-users-dot error" />
                    {error}
                  </div>
                ) : null}

                {activeTab === "list" ? (
                  loading ? (
                    <div className="admin-users-loading">
                      <div className="admin-users-spinner" />
                      Loading admins...
                    </div>
                  ) : admins.length === 0 ? (
                    <div className="admin-users-empty">
                      <span className="admin-users-empty-icon">👤</span>
                      No admins found. Add one to get started.
                    </div>
                  ) : (
                    <table className="admin-users-table">
                      <thead>
                        <tr>
                          <th className="admin-users-th">Account</th>
                          <th className="admin-users-th">Role</th>
                          <th className="admin-users-th action">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map((admin) => (
                          <tr key={admin.username} className="admin-users-row">
                            <td className="admin-users-td">
                              <div className="admin-users-email-cell">
                                <div className="admin-users-avatar">
                                  {getInitials(admin.username)}
                                </div>
                                <div>
                                  <div className="admin-users-email-text">
                                    {admin.username}
                                  </div>
                                  <div className="admin-users-email-domain">
                                    {admin.username.split("@")[1] || ""}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="admin-users-td">
                              <span
                                className={`admin-users-badge ${admin.role}`}
                              >
                                {admin.role}
                              </span>
                            </td>
                            <td className="admin-users-td action">
                              <button
                                className="admin-users-delete-btn"
                                type="button"
                                onClick={() => handleDeleteAdmin(admin.username)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                ) : null}

                {activeTab === "add" ? (
                  <div>
                    <p className="admin-users-section-title">
                      Create new admin account
                    </p>
                    <p className="admin-users-section-sub">
                      New admin will be able to access the admin panel immediately.
                    </p>
                    <div className="admin-users-divider" />

                    <form onSubmit={handleCreateAdmin} className="admin-users-form">
                      <div className="admin-users-field">
                        <label className="admin-users-label">Email address</label>
                        <input
                          className="admin-users-input"
                          type="email"
                          placeholder="admin@example.com"
                          value={newAdmin.username}
                          onChange={(e) =>
                            setNewAdmin((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="admin-users-field">
                        <label className="admin-users-label">Password</label>
                        <input
                          className="admin-users-input"
                          type="password"
                          placeholder="Minimum 8 characters"
                          value={newAdmin.password}
                          onChange={(e) =>
                            setNewAdmin((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="admin-users-field">
                        <label className="admin-users-label">Role</label>
                        <select
                          className="admin-users-select"
                          value={newAdmin.role}
                          onChange={(e) =>
                            setNewAdmin((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                        >
                          <option value="admin">admin</option>
                          <option value="super-admin">super-admin</option>
                        </select>
                        <span className="admin-users-hint">
                          super-admin has full platform access
                        </span>
                      </div>

                      <button className="admin-users-submit-btn" type="submit">
                        Create Admin
                      </button>
                    </form>
                  </div>
                ) : null}

                {activeTab === "edit" ? (
                  <div>
                    <p className="admin-users-section-title">
                      Update existing admin
                    </p>
                    <p className="admin-users-section-sub">
                      Change password or role. Leave password blank to keep it
                      unchanged.
                    </p>
                    <div className="admin-users-divider" />

                    <form onSubmit={handleUpdateAdmin} className="admin-users-form">
                      <div className="admin-users-field">
                        <label className="admin-users-label">Select admin</label>
                        <select
                          className="admin-users-select"
                          value={editAdmin.username}
                          onChange={(e) => {
                            const selectedUsername = e.target.value;
                            const selectedAdmin = admins.find(
                              (admin) => admin.username === selectedUsername
                            );

                            setEditAdmin({
                              username: selectedUsername,
                              password: "",
                              role: selectedAdmin?.role || "admin",
                            });
                          }}
                          required
                        >
                          <option value="">Choose an admin...</option>
                          {admins.map((admin) => (
                            <option key={admin.username} value={admin.username}>
                              {admin.username}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-users-field">
                        <label className="admin-users-label">New password</label>
                        <input
                          className="admin-users-input"
                          type="password"
                          placeholder="Leave blank to keep current"
                          value={editAdmin.password}
                          onChange={(e) =>
                            setEditAdmin((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="admin-users-field">
                        <label className="admin-users-label">Role</label>
                        <select
                          className="admin-users-select"
                          value={editAdmin.role}
                          onChange={(e) =>
                            setEditAdmin((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                        >
                          <option value="admin">admin</option>
                          <option value="super-admin">super-admin</option>
                        </select>
                      </div>

                      <button className="admin-users-submit-btn" type="submit">
                        Save Changes
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-dashboard" />
      <ConfirmDialog
        open={Boolean(pendingDeleteUsername)}
        title="Delete Admin?"
        message={
          pendingDeleteUsername
            ? `This will permanently remove '${pendingDeleteUsername}'.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!deleteLoading) {
            setPendingDeleteUsername("");
          }
        }}
      />
    </div>
  );
}
