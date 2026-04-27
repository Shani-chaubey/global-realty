"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./admin-login.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

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
    } catch {
      setError("Unable to login");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password must match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to reset password");
        return;
      }

      setSuccessMessage(data.message || "Password reset successfully.");
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsForgotPasswordMode(false);
    } catch {
      setError("Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="al-root">
        {/* ── LEFT PANEL ── */}
        <div className="al-left">
          <div className="al-orb al-orb-1" />
          <div className="al-orb al-orb-2" />
          <div className="al-orb al-orb-3" />
          <div className="al-rings">
            <div className="al-ring al-ring-1" />
            <div className="al-ring al-ring-2" />
            <div className="al-ring al-ring-3" />
          </div>

          <div className="al-brand">
            <div className="al-brand-mark">
              <div className="al-brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="al-brand-name">Global Realty</span>
            </div>
          </div>

          <div className="al-hero">
            <p className="al-eyebrow">Admin Control Center</p>
            <h1 className="al-hero-title">
              Manage<br />
              your <em>properties</em>
            </h1>
            <p className="al-hero-desc">
              Access listings, user profile data, reviews, and saved searches in one secure dashboard experience.
            </p>
          </div>

          <div className="al-stats">
            <div>
              <div className="al-stat-val">MongoDB</div>
              <div className="al-stat-label">Realtime Data</div>
            </div>
            <div className="al-stat-divider" />
            <div>
              <div className="al-stat-val">Secure</div>
              <div className="al-stat-label">Session Guard</div>
            </div>
            <div className="al-stat-divider" />
            <div>
              <div className="al-stat-val">Theme</div>
              <div className="al-stat-label">Aligned UI</div>
            </div>
          </div>

          <div className="al-dot-grid">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="al-dot" />
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="al-right">
          <div className="al-form-wrap">
            <div className="al-form-header">
              <div className="al-form-tag">
                <div className="al-form-tag-dot" />
                Protected Access
              </div>
              <h2 className="al-form-title">
                {isForgotPasswordMode ? "Reset Password" : "Welcome Back"}
              </h2>
              <p className="al-form-sub">
                {isForgotPasswordMode
                  ? "Set a new password for your admin account."
                  : "Sign in with your admin credentials to continue to the Proty dashboard."}
              </p>
            </div>

            <form
              onSubmit={
                isForgotPasswordMode
                  ? handleForgotPasswordSubmit
                  : handleSubmit
              }
              noValidate
            >
              <div className="al-field">
                <label htmlFor="admin-username" className="al-label">Username</label>
                <div className="al-input-wrap">
                  <span className="al-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    id="admin-username"
                    type="text"
                    className="al-input"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {!isForgotPasswordMode ? (
              <div className="al-field">
                <label htmlFor="admin-password" className="al-label">Password</label>
                <div className="al-input-wrap">
                  <span className="al-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    className="al-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="al-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94C16.23 19.24 14.15 20 12 20C5 20 1 12 1 12C2.24 9.68 3.97 7.66 6.06 6.06M9.9 4.24C10.59 4.08 11.29 4 12 4C19 4 23 12 23 12C22.39 13.14 21.67 14.2 20.84 15.19M14.12 14.12C13.85 14.41 13.51 14.65 13.15 14.82C12.78 14.98 12.38 15.07 11.98 15.07C11.58 15.07 11.18 14.98 10.8 14.82C10.43 14.65 10.09 14.41 9.8 14.12C9.52 13.84 9.29 13.5 9.14 13.14C8.99 12.77 8.92 12.38 8.93 11.98C8.93 11.58 9.02 11.18 9.18 10.81C9.35 10.44 9.59 10.11 9.88 9.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              ) : (
                <>
                  <div className="al-field">
                    <label htmlFor="admin-new-password" className="al-label">
                      New Password
                    </label>
                    <div className="al-input-wrap">
                      <span className="al-input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <input
                        id="admin-new-password"
                        type={showPassword ? "text" : "password"}
                        className="al-input"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="al-field">
                    <label htmlFor="admin-confirm-password" className="al-label">
                      Confirm New Password
                    </label>
                    <div className="al-input-wrap">
                      <span className="al-input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <input
                        id="admin-confirm-password"
                        type={showPassword ? "text" : "password"}
                        className="al-input"
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </>
              )}

              {!isForgotPasswordMode ? (
              <div className="al-helpers">
                <label className="al-checkbox-wrap">
                  <input
                    type="checkbox"
                    className="al-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="al-checkbox-label">Keep me signed in</span>
                </label>
                <button
                  type="button"
                  className="al-forgot al-link-btn"
                  onClick={() => {
                    setIsForgotPasswordMode(true);
                    setError("");
                    setSuccessMessage("");
                  }}
                >
                  Forgot password?
                </button>
              </div>
              ) : (
                <div className="al-helpers">
                  <button
                    type="button"
                    className="al-forgot al-link-btn"
                    onClick={() => {
                      setIsForgotPasswordMode(false);
                      setError("");
                      setSuccessMessage("");
                    }}
                  >
                    Back to login
                  </button>
                </div>
              )}

              {error && (
                <div className="al-error">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="al-success">
                  {successMessage}
                </div>
              )}

              <div className="al-btn-wrap">
                <button type="submit" className="al-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="al-spinner" />
                      Authenticating…
                    </>
                  ) : (
                    <>
                      {isForgotPasswordMode
                        ? "Reset Password"
                        : "Continue to Dashboard"}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="al-divider">
              <div className="al-divider-line" />
              <span className="al-divider-text">proty admin</span>
              <div className="al-divider-line" />
            </div>

            <div className="al-footer">
              <Link href="/" className="al-footer-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.53 20.79 21.04 20.41 21.41C20.04 21.79 19.53 22 19 22H5C4.47 22 3.96 21.79 3.59 21.41C3.21 21.04 3 20.53 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
              </Link>
              <div className="al-footer-sep" />
              <Link href="#" className="al-footer-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}