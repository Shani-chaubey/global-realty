"use client";

/**
 * Career hero: optional CMS banner (fixed height) + title/subtitle overlay.
 * When `bannerImage` is set, it overrides the default SCSS background image.
 */
export default function PageTitle({
  heroTitle = "A Culture of Inclusivity and Belonging",
  heroSubtitle = "Thousands of luxury home enthusiasts just like you visit our website.",
  bannerImage = "",
}) {
  const hasBanner = Boolean(String(bannerImage || "").trim());

  return (
    <div
      className={`page-title career${hasBanner ? " career-page-title--cms-banner" : ""}`}
      style={
        hasBanner
          ? {
              backgroundImage: `url(${bannerImage})`,
            }
          : undefined
      }
    >
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-lg-8">
            <div className="content-inner">
              <div className="heading-title">
                <h1 className="title">{heroTitle}</h1>
                <p className="h6 fw-4">{heroSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
