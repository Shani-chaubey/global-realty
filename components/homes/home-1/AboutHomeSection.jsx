"use client";

import Link from "next/link";

export default function AboutHomeSection({ content }) {
  if (!content?.isActive) return null;

  const highlights = Array.isArray(content.highlights)
    ? content.highlights.filter(Boolean)
    : [];

  return (
    <section className="home-about-section tf-spacing-3">
      <div className="tf-container">
        <div className="home-about-wrap">

          {/* ── Left: image column ─────────────────────────── */}
          <div className="home-about-media-col">
            <div className="home-about-img-frame">
              {/* decorative accent blobs */}
              <span className="home-about-blob home-about-blob--tl" aria-hidden />
              <span className="home-about-blob home-about-blob--br" aria-hidden />

              {content.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.image}
                  alt={content.title || "About us"}
                  className="home-about-main-img"
                />
              ) : (
                <div className="home-about-img-placeholder">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Upload an image from dashboard</span>
                </div>
              )}

              {/* floating badge */}
              <div className="home-about-badge" aria-hidden>
                <span className="home-about-badge__icon">🏆</span>
                <div>
                  <span className="home-about-badge__num">500+</span>
                  <span className="home-about-badge__lbl">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: content column ──────────────────────── */}
          <div className="home-about-text-col">
            {content.eyebrow ? (
              <div className="home-about-eyebrow-row">
                <span className="home-about-eyebrow-line" aria-hidden />
                <p className="home-about-eyebrow">{content.eyebrow}</p>
              </div>
            ) : null}

            {content.title ? (
              <h2 className="home-about-title">{content.title}</h2>
            ) : null}

            {content.description ? (
              <p className="home-about-description">{content.description}</p>
            ) : null}

            {highlights.length ? (
              <ul className="home-about-list">
                {highlights.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="home-about-list__item">
                    <span className="home-about-list__check" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {content.ctaText && content.ctaLink ? (
              <Link href={content.ctaLink} className="tf-btn bg-color-primary pd-23 home-about-cta">
                {content.ctaText}
                <i className="icon-arrow-right" style={{ fontSize: 16 }} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
