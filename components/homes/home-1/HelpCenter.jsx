"use client";

import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { helpCenterIconClass } from "@/lib/helpCenterIconClass";
import { DEFAULT_HELP_CENTER_CONTENT } from "@/lib/helpCenterDefaults";
import Link from "next/link";
import { useState } from "react";

function renderTitle(text) {
  const lines = String(text || "").split(/\n/);
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

function CtaLink({ href, className, children }) {
  const h = href || "/";
  if (h.startsWith("/")) {
    return (
      <Link href={h} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={h} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function HelpCenter({ content }) {
  const data = content && content.tabs?.length ? content : DEFAULT_HELP_CENTER_CONTENT;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = data.tabs[activeIndex] || data.tabs[0];

  return (
    <section className="section-help tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text={data.heading} />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                {data.subheading}
              </p>
            </div>
            <div className="widget-tabs style-2 style-border-primary">
              <ul className="widget-menu-tab ">
                {data.tabs.map((item, index) => (
                  <li
                    key={item.label + index}
                    className={`item-title ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="widget-content-tab">
                <div className="widget-content-inner active fadeInTab">
                  <div className=" tf-grid-layout md-col-3 ">
                    {activeTab?.cards?.map((card, i) => (
                      <div
                        className="icons-box default effec-icon "
                        key={`${activeIndex}-${i}`}
                      >
                        <div className="tf-icon text-center">
                          <i
                            className={`icon ${helpCenterIconClass(card.icon)}`}
                            style={{ fontSize: 56, lineHeight: 1 }}
                            aria-hidden
                          />
                        </div>
                        <h4 className="title text-center">
                          <CtaLink href={card.buttonHref}>
                            {renderTitle(card.title)}
                          </CtaLink>
                        </h4>
                        <p className="text-center text-1">{card.description}</p>
                        <CtaLink
                          href={card.buttonHref}
                          className="tf-btn style-border pd-5 mx-auto"
                        >
                          {card.buttonLabel}
                        </CtaLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text text-center text-1 " data-wow-duration="2s">
              {data.footerLine}{" "}
              <CtaLink href={data.footerCtaHref} className="fw-7">
                {data.footerCtaLabel}
              </CtaLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
