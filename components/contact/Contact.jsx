"use client";
import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);

export default function Contact() {
  const { data } = useSWR("/cms/contact-info", fetcher);
  const contactInfo = data?.data;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/inquiries", form);
      toast.success("Message sent! We'll get back to you soon.");
      setSubmitted(true);
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flat-section-v2 flat-map">
      {contactInfo?.mapEmbedUrl && (
        <div className="map-wrap">
          <iframe
            src={contactInfo.mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          />
        </div>
      )}

      <div className="tf-container">
        <div className="row mt-40">
          <div className="col-xl-5 col-lg-5">
            <div className="box-info-contact">
              <h3 className="fw-7 mb-30">Get in Touch</h3>

              {contactInfo?.phones?.length > 0 && (
                <div className="box-item mb-16">
                  <div className="icon">
                    <i className="icon-phone-1" />
                  </div>
                  <div className="content">
                    <p className="text-variant-1 text-4">Phone</p>
                    <div>
                      {contactInfo.phones.map((phone, i) => (
                        <a key={i} href={`tel:${phone}`} className="title-3 d-block hover:text-primary">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {contactInfo?.emails?.length > 0 && (
                <div className="box-item mb-16">
                  <div className="icon">
                    <i className="icon-mail" />
                  </div>
                  <div className="content">
                    <p className="text-variant-1 text-4">Email</p>
                    <div>
                      {contactInfo.emails.map((email, i) => (
                        <a key={i} href={`mailto:${email}`} className="title-3 d-block hover:text-primary">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {contactInfo?.address && (
                <div className="box-item mb-16">
                  <div className="icon">
                    <i className="icon-location" />
                  </div>
                  <div className="content">
                    <p className="text-variant-1 text-4">Address</p>
                    <p className="title-3">{contactInfo.address}</p>
                  </div>
                </div>
              )}

              {contactInfo?.workingHours && (
                <div className="box-item mb-16">
                  <div className="icon">
                    <i className="icon-clock" />
                  </div>
                  <div className="content">
                    <p className="text-variant-1 text-4">Working Hours</p>
                    <p className="title-3">{contactInfo.workingHours}</p>
                  </div>
                </div>
              )}

              {contactInfo?.socialLinks && Object.values(contactInfo.socialLinks).some(Boolean) && (
                <div className="social-links flex gap-3 mt-20">
                  {Object.entries(contactInfo.socialLinks).map(([key, url]) =>
                    url ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-primary hover:text-primary transition-colors capitalize text-sm"
                        title={key}
                      >
                        {key[0].toUpperCase()}
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col-xl-7 col-lg-7">
            <div className="box-form-contact">
              <h3 className="fw-7 mb-30">Send Us a Message</h3>

              {submitted ? (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-center">
                  <p className="text-xl fw-6 mb-2">Thank you! 🎉</p>
                  <p>Your message has been received. We'll contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-contact">
                  <div className="row">
                    <div className="col-md-6">
                      <fieldset className="mb-16">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name *"
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset className="mb-16">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address *"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset className="mb-16">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset className="mb-30">
                        <textarea
                          className="form-control"
                          rows={5}
                          placeholder="Your Message *"
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="tf-btn bg-color-primary fw-6 w-full disabled:opacity-60"
                      >
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
