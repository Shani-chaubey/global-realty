"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function Sidebar({ property }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const agent = property?.agentId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/inquiries", {
        ...form,
        propertyId: property?._id,
        propertyTitle: property?.title,
      });
      toast.success("Inquiry sent! We'll get back to you soon.");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tf-sidebar sticky-sidebar">
      <form className="form-contact-seller mb-30" onSubmit={handleSubmit}>
        <h4 className="heading-title mb-30">Contact Seller</h4>

        {agent && (
          <div className="seller-info mb-20">
            <div className="avartar">
              <Image
                alt={agent.name || "Agent"}
                src={agent.avatar || "/images/avatar/seller.jpg"}
                width={200}
                height={200}
              />
            </div>
            <div className="content">
              <h6 className="name">{agent.name || "Our Agent"}</h6>
              <ul className="contact">
                {agent.phone && (
                  <li>
                    <i className="icon-phone-1" />
                    <a href={`tel:${agent.phone}`}>{agent.phone}</a>
                  </li>
                )}
                {agent.email && (
                  <li>
                    <i className="icon-mail" />
                    <a href={`mailto:${agent.email}`}>{agent.email}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="det-success-box">
            <p style={{ fontWeight: 600 }}>Thank you!</p>
            <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>Your inquiry has been submitted. We&apos;ll contact you soon.</p>
          </div>
        ) : (
          <>
            <fieldset className="mb-12">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </fieldset>
            <fieldset className="mb-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
            </fieldset>
            <fieldset className="mb-12">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
            </fieldset>
            <fieldset className="mb-30">
              <textarea
                className="form-control"
                cols={30}
                rows={5}
                placeholder={`I'm interested in ${property?.title || "this property"}...`}
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                required
              />
            </fieldset>
            <button
              type="submit"
              disabled={submitting}
              className="tf-btn bg-color-primary" style={{ width: "100%", opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Sending..." : "Send Inquiry"}
            </button>
          </>
        )}
      </form>

      <div className="sidebar-ads mb-30">
        <div className="box-ads" style={{ position: "relative", zIndex: 5, padding: "1rem" }}>
          <div className="content mb-3">
            <h4 className="title fw-6 mb-2">
              Looking for more options?
            </h4>
            <p className="text-color-default text-sm">
              Browse our full property listings to find your perfect home.
            </p>
          </div>
          <a href="/properties" className="tf-btn fw-6 bg-color-primary fw-6 w-full">
            View All Properties
          </a>
        </div>
      </div>
    </div>
  );
}
