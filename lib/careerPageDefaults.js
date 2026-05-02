/** Default career page copy & assets when CMS document is empty or partial. */
export const careerPageDefaults = {
  heroTitle: "A Culture of Inclusivity and Belonging",
  heroSubtitle:
    "Thousands of luxury home enthusiasts just like you visit our website.",
  jobsSectionTitle: "Best Job For You At Proty",
  jobsSectionSubtitle:
    "We connect you directly to the person that knows the most about a property for sale, the listing agent.",
  jobsLoadMoreUrl: "",
  benefitsTitle: "Benefits when you work\nat Proty",
  benefitsPara1:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin ipsum ullamcorper, pulvinar ipsum in, imperdiet ante. In feugiat tortor semper nibh rhoncus volutpat. Suspendisse potenti.",
  benefitsPara2:
    "Proin pharetra rhoncus maximus. Sed est dolor, consectetur eu sagittis a",
  benefitsImage1: "/images/section/section-benefits-1.jpg",
  benefitsImage2: "/images/section/section-benefits-2.jpg",
  benefitItems: [
    { iconClass: "icon-heart-1", label: "Health care" },
    { iconClass: "icon-pig", label: "Attractive salary and bonus" },
    { iconClass: "icon-family", label: "Family life" },
  ],
  benefitsCtaLabel: "Join our team",
  benefitsCtaHref: "#",
  reviewsTitle: "Reviews from employees working at Proty",
  reviewsPara1:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin ipsum ullamcorper, pulvinar ipsum in, imperdiet ante. In feugiat tortor semper nibh rhoncus volutpat.",
  reviewsPara2:
    "Proin pharetra rhoncus maximus. Sed est dolor, consectetur eu sagittis a",
  reviewsPersonImage: "/images/section/person-3.png",
  reviewsSpotlightName: "Cody Fisher",
  reviewsSpotlightRole: "CEO Themesflat",
  reviewsSpotlightAvatar: "/images/avatar/avt-png18.png",
  reviewsCardQuote:
    "Vivamus at nisl ornare, vulputate turpis finibus, posuere metus. Donec in placerat felis. Praesent ante tellus, dignissim nec imperdiet ac.",
  reviewsCardName: "Cody Fisher",
  reviewsCardRole: "CEO Themesflat",
  reviewsCardAvatar: "/images/avatar/testimonials-4.jpg",
  reviewsMoreStoriesHref: "#",
};

export function mergeCareerPage(doc) {
  const d = doc && typeof doc === "object" ? doc : {};
  const out = { ...careerPageDefaults };
  for (const k of Object.keys(careerPageDefaults)) {
    const v = d[k];
    if (k === "benefitItems") {
      if (Array.isArray(d.benefitItems) && d.benefitItems.length > 0) {
        out.benefitItems = d.benefitItems.map((b) => ({
          iconClass: b.iconClass || "icon-heart-1",
          label: b.label || "",
        }));
      }
      continue;
    }
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      out[k] = v;
    }
  }
  return out;
}
