"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);

export default function Reviews({ propertyId }) {
  const { data, isLoading } = useSWR(
    propertyId ? `/reviews?propertyId=${propertyId}` : null,
    fetcher
  );
  const reviews = data?.data || [];

  const [form, setForm] = useState({ name: "", email: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/reviews", { ...form, propertyId });
      toast.success("Review submitted! It will appear after approval.");
      setForm({ name: "", email: "", rating: 5, comment: "" });
      mutate(`/reviews?propertyId=${propertyId}`);
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Reviews {reviews.length > 0 && `(${reviews.length})`}
      </div>

      {reviews.length > 0 && (
        <div className="det-review-summary">
          <div className="det-review-avg">
            <span style={{ fontSize: "2.5rem", fontWeight: 700 }} className="text-color-heading">{avgRating}</span>
            <div>
              <div className="det-review-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: s <= Math.round(avgRating) ? "#facc15" : "#d1d5db" }}>★</span>
                ))}
              </div>
              <p className="text-sm text-color-default">{reviews.length} reviews</p>
            </div>
          </div>
          <div className="det-comment-list">
            {reviews.map((review) => (
              <div key={review._id} className="det-comment">
                <div className="det-comment__header">
                  <div>
                    <p className="det-comment__name">{review.name}</p>
                    <div className="det-review-stars det-review-stars--sm">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} style={{ color: s <= review.rating ? "#facc15" : "#d1d5db" }}>★</span>
                      ))}
                    </div>
                  </div>
                  <span className="det-comment__date">{new Date(review.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
                <p className="text-color-default" style={{ fontSize: "0.875rem" }}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="write-review mt-30">
        <h5 className="fw-6 mb-20 text-color-heading">Write a Review</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-20">
            <label className="det-review-form__label">Your Rating</label>
            <div className="det-review-stars det-review-stars--picker">
              {[1,2,3,4,5].map((s) => (
                <button key={s} type="button" onClick={() => setForm((p) => ({ ...p, rating: s }))} style={{ fontSize: "1.5rem", color: s <= form.rating ? "#facc15" : "#d1d5db", background: "none", border: "none", cursor: "pointer" }}>★</button>
              ))}
            </div>
          </div>
          <fieldset className="mb-12">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </fieldset>
          <fieldset className="mb-12">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </fieldset>
          <fieldset className="mb-30">
            <textarea
              className="form-control"
              rows={4}
              placeholder="Your review..."
              value={form.comment}
              onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
              required
            />
          </fieldset>
          <button
            type="submit"
            disabled={submitting}
            className="tf-btn bg-color-primary disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </>
  );
}
