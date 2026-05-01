"use client";
import React, { useState } from "react";
import Image from "next/image";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  message: "",
  budget: "",
  propertyType: "",
};

export default function InquiryModal() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "website-inquiry-popup",
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm(INITIAL_FORM);
        setTimeout(() => {
          setSuccess(false);
          const modal = document.getElementById("modalInquiry");
          if (modal) {
            const bsModal = window.bootstrap?.Modal?.getInstance(modal);
            if (bsModal) bsModal.hide();
          }
        }, 3000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal fade" id="modalInquiry" tabIndex={-1} aria-labelledby="inquiryModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 680 }}>
        <div className="modal-content" style={{ borderRadius: 20, overflow: "hidden", border: "none" }}>
          <div style={{ display: "flex", minHeight: 520 }}>
            {/* Left decorative panel */}
            <div
              style={{
                width: 220,
                background: "linear-gradient(160deg, var(--color-primary, #F1913D) 0%, #c0392b 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 1.25rem",
                color: "#fff",
                flexShrink: 0,
              }}
              className="d-none d-md-flex"
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏠</div>
              <h4 style={{ fontWeight: 700, fontSize: "1.15rem", textAlign: "center", marginBottom: "0.75rem" }}>
                Find Your Dream Property
              </h4>
              <p style={{ fontSize: "0.85rem", opacity: 0.9, textAlign: "center", lineHeight: 1.6 }}>
                Our experts will reach out within 24 hours to help you find the perfect home.
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem", width: "100%" }}>
                {["Expert Guidance", "Best Deals", "Zero Brokerage", "Verified Properties"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", fontSize: "0.8rem" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right form panel */}
            <div style={{ flex: 1, padding: "2rem 1.75rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.35rem", margin: 0 }}>Get in Touch</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    Tell us what you're looking for
                  </p>
                </div>
                <button
                  type="button"
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "#9ca3af", lineHeight: 1 }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {success ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "1rem" }}>
                  <div style={{ fontSize: "3.5rem" }}>🎉</div>
                  <h4 style={{ fontWeight: 700, color: "#059669" }}>Thank you!</h4>
                  <p style={{ color: "#6b7280" }}>We've received your inquiry and will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem", flex: 1 }}>
                  {error && (
                    <div style={{ background: "#fee2e2", color: "#dc2626", padding: "0.6rem 0.9rem", borderRadius: 8, fontSize: "0.875rem" }}>
                      {error}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your name"
                        required
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="your@email.com"
                      required
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                        Property Type
                      </label>
                      <select
                        value={form.propertyType}
                        onChange={set("propertyType")}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: "0.9rem", outline: "none", background: "#fff" }}
                      >
                        <option value="">Any Type</option>
                        <option>Apartment</option>
                        <option>Villa</option>
                        <option>House</option>
                        <option>Plot</option>
                        <option>Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                        Budget (₹)
                      </label>
                      <select
                        value={form.budget}
                        onChange={set("budget")}
                        style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: "0.9rem", outline: "none", background: "#fff" }}
                      >
                        <option value="">Select Budget</option>
                        <option>Under 25 Lakhs</option>
                        <option>25L – 50L</option>
                        <option>50L – 1 Crore</option>
                        <option>1Cr – 2Cr</option>
                        <option>Above 2 Crore</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us more about what you're looking for..."
                      rows={3}
                      style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: "0.9rem", outline: "none", resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: "var(--color-primary, #F1913D)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "0.75rem 1.5rem",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                      marginTop: "0.25rem",
                    }}
                  >
                    {submitting ? "Sending..." : "Send Inquiry →"}
                  </button>

                  <p style={{ fontSize: "0.75rem", color: "#9ca3af", textAlign: "center" }}>
                    By submitting, you agree to our privacy policy. We'll never spam you.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
