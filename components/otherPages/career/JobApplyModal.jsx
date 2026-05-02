"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

const MAX_PDF_MB = 8;

export default function JobApplyModal({ open, onClose, job }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setLinkedinUrl("");
    setCoverLetter("");
    setFile(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!job) return;
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in your name, email, and phone.");
      return;
    }
    if (!coverLetter.trim()) {
      toast.error("Please add a short cover letter.");
      return;
    }
    if (!file) {
      toast.error("Please upload your resume as a PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Resume must be a PDF file.");
      return;
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      toast.error(`PDF must be under ${MAX_PDF_MB}MB.`);
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "job-applications");

      const up = await fetch("/api/upload", { method: "POST", body: fd });
      const upJson = await up.json();
      if (!upJson.success || !upJson.data?.url) {
        throw new Error(upJson.error || "Upload failed");
      }

      const res = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          linkedinUrl: linkedinUrl.trim(),
          jobPostingId: job._id,
          jobTitle: job.title || "",
          department: job.department || "",
          location: job.location || "",
          salaryLabel: job.salaryLabel || "",
          coverLetter: coverLetter.trim(),
          resumeUrl: upJson.data.url,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Could not submit application");

      toast.success("Application submitted. We’ll be in touch soon.");
      handleClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (!job) return null;

  return (
    <Modal isOpen={open} onClose={handleClose} title="Apply for this role" size="lg">
      <form className="job-apply-form" onSubmit={onSubmit}>
        <p className="text-2 mb-16">
          <strong>{job.title}</strong>
          {job.location ? ` · ${job.location}` : ""}
        </p>
        <div className="job-apply-grid mb-16">
          <div className="job-apply-field">
            <label className="text-2 fw-6 d-block mb-8">Full name *</label>
            <input
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="job-apply-field">
            <label className="text-2 fw-6 d-block mb-8">Email *</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="job-apply-field">
            <label className="text-2 fw-6 d-block mb-8">Phone *</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>
          <div className="job-apply-field">
            <label className="text-2 fw-6 d-block mb-8">LinkedIn (optional)</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>
          <div className="job-apply-field job-apply-field--full">
            <label className="text-2 fw-6 d-block mb-8">Cover letter *</label>
            <textarea
              className="form-control"
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us why you’re a great fit…"
              required
            />
          </div>
          <div className="job-apply-field job-apply-field--full">
            <label className="text-2 fw-6 d-block mb-8">Resume (PDF) *</label>
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="form-control"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="text-3 mt-8 mb-0">PDF only, max {MAX_PDF_MB}MB.</p>
          </div>
        </div>
        <div className="d-flex gap-3 justify-content-end flex-wrap">
          <button type="button" className="tf-btn style-border pd-10" onClick={handleClose} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="tf-btn bg-color-primary fw-7 pd-16" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit application"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
