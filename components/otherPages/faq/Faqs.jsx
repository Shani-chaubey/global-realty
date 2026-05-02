import ContactSellerSidebar from "@/components/common/ContactSellerSidebar";
import React from "react";

function slugify(value) {
  const s = String(value || "general")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "general";
}

function categoryTitle(category) {
  const c = String(category || "general").trim() || "general";
  return c
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function groupFaqs(faqs) {
  const map = new Map();
  for (const f of faqs) {
    const cat = String(f.category || "general").trim() || "general";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push(f);
  }
  const groups = [...map.entries()].map(([category, items]) => {
    const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const sortKey = sorted.reduce(
      (m, i) => Math.min(m, i.order ?? 0),
      Number.POSITIVE_INFINITY,
    );
    return {
      category,
      items: sorted,
      sortKey: Number.isFinite(sortKey) ? sortKey : 0,
    };
  });
  groups.sort(
    (a, b) => a.sortKey - b.sortKey || a.category.localeCompare(b.category),
  );
  return groups;
}

export default function Faqs({ faqs = [] }) {
  const groups = groupFaqs(faqs);

  return (
    <section className="section-faq">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="heading-section mb-48">
              <h2 className="title">Frequently Asked Questions</h2>
            </div>
            {groups.length === 0 ? (
              <div className="tf-faq mb-49">
                <p className="text-1 text-color-3">
                  No questions have been published yet. Please check back soon.
                </p>
              </div>
            ) : (
              groups.map(({ category, items }, groupIdx) => {
                const wrapperId = `faq-cat-${slugify(category)}-${groupIdx}`;
                const isLast = groupIdx === groups.length - 1;
                return (
                  <div
                    key={`${category}-${groupIdx}`}
                    className={isLast ? "tf-faq" : "tf-faq mb-49"}
                  >
                    <h3 className="fw-8 title mb-24">
                      {categoryTitle(category)}
                    </h3>
                    <ul className="box-faq" id={wrapperId}>
                      {items.map((faq) => {
                        const id = `faq-${String(faq._id)}`;
                        return (
                          <li key={id} className="faq-item">
                            <a
                              href={`#${id}`}
                              className="faq-header h6 collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="false"
                              aria-controls={id}
                            >
                              {faq.question}
                              <i className="icon-CaretDown" />
                            </a>
                            <div
                              id={id}
                              className="collapse"
                              data-bs-parent={`#${wrapperId}`}
                            >
                              <p
                                className="faq-body"
                                style={{ whiteSpace: "pre-wrap" }}
                              >
                                {faq.answer}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
          <div className="col-xl-4 col-lg-5">
            <ContactSellerSidebar
              inquiryMeta={{ projectName: "FAQs" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
