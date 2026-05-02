"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const emptyForm = { name: "", email: "", phone: "", message: "" };

const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

export default function ContactSellerSidebar({
  property,
  inquiryMeta,
  className = "",
  id = "contact-seller",
}) {
  const [form1, setForm1] = useState(emptyForm);
  const [submitting1, setSubmitting1] = useState(false);
  const [submitted1, setSubmitted1] = useState(false);

  const [form2, setForm2] = useState(emptyForm);
  const [submitting2, setSubmitting2] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });

  const agentRef = property?.agentId || {};
  const agentObj = property?.agent || {};
  const agent = {
    name: agentRef?.name || agentObj?.name || "",
    phone: agentRef?.phone || agentObj?.phone || contactInfo.phone || "",
    email: agentRef?.email || agentObj?.email || contactInfo.email || "",
    avatar: agentRef?.avatar || agentObj?.avatar || "",
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/website/contact-info")
      .then((r) => r.json())
      .then((res) => {
        if (!mounted || !res?.success) return;
        setContactInfo({
          phone: res?.data?.phones?.[0] || "",
          email: res?.data?.emails?.[0] || "",
        });
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const getPageMeta = () => {
    const pageName =
      inquiryMeta?.pageName ??
      (typeof window !== "undefined" ? window.location.href : "");
    const projectName =
      inquiryMeta?.projectName !== undefined && inquiryMeta?.projectName !== null
        ? inquiryMeta.projectName
        : property?.title ?? "";
    return { projectName, pageName };
  };

  const submitInquiry = async (formData, setSubmitting, setSubmitted) => {
    const { projectName, pageName } = getPageMeta();
    setSubmitting(true);
    try {
      await api.post("/inquiries", {
        ...formData,
        propertyId: property?._id,
        propertyTitle: property?.title,
        projectName,
        pageName,
      });
      toast.success("Message sent! We'll get back to you soon.");
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!form1.name || !form1.email || !form1.message) {
      toast.error("Please fill all required fields");
      return;
    }
    await submitInquiry(form1, setSubmitting1, setSubmitted1);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!form2.name || !form2.email || !form2.message) {
      toast.error("Please fill all required fields");
      return;
    }
    await submitInquiry(form2, setSubmitting2, setSubmitted2);
  };

  const messagePlaceholder =
    property?.title != null && property.title !== ""
      ? `I'm interested in ${property.title}...`
      : "Tell us how we can help...";

  return (
    <div
      className={`tf-sidebar sticky-sidebar${className ? ` ${className}` : ""}`}
      id={id}
    >
      <form className="form-contact-seller mb-30" onSubmit={handleSubmit1}>
        <h4 className="heading-title mb-30">Contact Sellers</h4>

        <div className="seller-info">
          <div className="avartar">
            <Image
              alt={agent?.name || "Agent"}
              src={agent?.avatar || defaultAvatar}
              width={200}
              height={200}
            />
          </div>
          <div className="content">
            <h6 className="name">{agent?.name || "Our Agent"}</h6>
            <ul className="contact">
              <li>
                <i className="icon-phone-1" />
                {agent?.phone ? (
                  <a href={`tel:${agent.phone}`}>{agent.phone}</a>
                ) : (
                  <span>Contact us</span>
                )}
              </li>
              <li>
                <i className="icon-mail" />
                {agent?.email ? (
                  <a href={`mailto:${agent.email}`}>{agent.email}</a>
                ) : (
                  <span>Contact us</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {submitted1 ? (
          <div style={{ padding: "1rem 0" }}>
            <p className="fw-6 text-color-heading">Thank you!</p>
            <p
              className="text-1 text-color-default"
              style={{ marginTop: "0.25rem" }}
            >
              Your inquiry has been submitted. We&apos;ll contact you soon.
            </p>
          </div>
        ) : (
          <>
            <fieldset className="mb-12">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name *"
                value={form1.name}
                onChange={(e) =>
                  setForm1((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </fieldset>
            <fieldset className="mb-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email *"
                value={form1.email}
                onChange={(e) =>
                  setForm1((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </fieldset>
            <fieldset className="mb-12">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={form1.phone}
                onChange={(e) =>
                  setForm1((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="mb-30">
              <textarea
                cols={30}
                rows={5}
                placeholder={messagePlaceholder}
                value={form1.message}
                onChange={(e) =>
                  setForm1((p) => ({ ...p, message: e.target.value }))
                }
                required
              />
            </fieldset>
            <button
              type="submit"
              disabled={submitting1}
              className="tf-btn bg-color-primary w-full"
              style={{ opacity: submitting1 ? 0.6 : 1 }}
            >
              {submitting1 ? "Sending..." : "Send message"}
            </button>
          </>
        )}
      </form>

      <form className="form-contact-agent" onSubmit={handleSubmit2}>
        <h4 className="heading-title mb-30">More About This Property</h4>

        {submitted2 ? (
          <div style={{ padding: "1rem 0" }}>
            <p className="fw-6 text-color-heading">Thank you!</p>
            <p
              className="text-1 text-color-default"
              style={{ marginTop: "0.25rem" }}
            >
              We&apos;ve received your message. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <fieldset>
              <input
                type="text"
                className="form-control"
                placeholder="Your name *"
                value={form2.name}
                onChange={(e) =>
                  setForm2((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </fieldset>
            <fieldset>
              <input
                type="email"
                className="form-control"
                placeholder="Email *"
                value={form2.email}
                onChange={(e) =>
                  setForm2((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </fieldset>
            <fieldset className="phone">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={form2.phone}
                onChange={(e) =>
                  setForm2((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </fieldset>
            <fieldset>
              <textarea
                cols={30}
                rows={5}
                placeholder="Message *"
                value={form2.message}
                onChange={(e) =>
                  setForm2((p) => ({ ...p, message: e.target.value }))
                }
                required
              />
            </fieldset>
            <div className="wrap-btn">
              <button
                type="submit"
                disabled={submitting2}
                className="tf-btn bg-color-primary fw-6 w-full"
                style={{ opacity: submitting2 ? 0.6 : 1 }}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.125 5.625V14.375C18.125 14.8723 17.9275 15.3492 17.5758 15.7008C17.2242 16.0525 16.7473 16.25 16.25 16.25H3.75C3.25272 16.25 2.77581 16.0525 2.42417 15.7008C2.07254 15.3492 1.875 14.8723 1.875 14.375V5.625M18.125 5.625C18.125 5.12772 17.9275 4.65081 17.5758 4.29917C17.2242 3.94754 16.7473 3.75 16.25 3.75H3.75C3.25272 3.75 2.77581 3.94754 2.42417 4.29917C2.07254 4.65081 1.875 5.12772 1.875 5.625M18.125 5.625V5.8275C18.125 6.14762 18.0431 6.46242 17.887 6.74191C17.7309 7.0214 17.5059 7.25628 17.2333 7.42417L10.9833 11.27C10.6877 11.4521 10.3472 11.5485 10 11.5485C9.65275 11.5485 9.31233 11.4521 9.01667 11.27L2.76667 7.425C2.4941 7.25711 2.26906 7.02224 2.11297 6.74275C1.95689 6.46325 1.87496 6.14845 1.875 5.82833V5.625"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {submitting2 ? "Sending..." : "Email agent"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
