/** Home “Discover how we can help” — used when CMS has no row yet. */
export const DEFAULT_HELP_CENTER_CONTENT = {
  heading: "Discover how we can help",
  subheading:
    "Whether you are buying, renting, or selling, Global Realty offers verified listings, clear paperwork, and local market guidance at every step.",
  tabs: [
    {
      label: "Buying",
      cards: [
        {
          title: "Find out how much you can afford",
          description:
            "We help you narrow a realistic budget from your income, existing loans, and preferred location—so you only shortlist homes that fit financially.",
          buttonLabel: "Browse homes for sale",
          buttonHref: "/properties?listingType=sale",
          icon: "house",
        },
        {
          title: "Understand your monthly costs",
          description:
            "See how loan amount, tenure, and interest rate affect EMI. Use our calculator to compare scenarios before you commit to a lender.",
          buttonLabel: "Open loan calculator",
          buttonHref: "/#loan-calculator",
          icon: "wallet",
        },
        {
          title: "Get help with your down payment",
          description:
            "Unsure how much to put down or which documents banks need? Our advisors explain options and connect you with trusted partners when you are ready.",
          buttonLabel: "Contact our team",
          buttonHref: "/contact",
          icon: "key",
        },
      ],
    },
    {
      label: "Renting",
      cards: [
        {
          title: "Find verified rental homes",
          description:
            "Explore long-term rentals with accurate photos, location details, and availability—filtered by budget, city, and property type.",
          buttonLabel: "Browse rentals",
          buttonHref: "/properties?listingType=rent",
          icon: "house",
        },
        {
          title: "Know what your rent includes",
          description:
            "We clarify maintenance, society charges, security deposit norms, and lock-in terms so there are no surprises after you move in.",
          buttonLabel: "Ask a question",
          buttonHref: "/contact",
          icon: "wallet",
        },
        {
          title: "Plan your move-in timeline",
          description:
            "From viewing and negotiation to agreement signing and handover, we coordinate with owners so your move stays on schedule.",
          buttonLabel: "View available listings",
          buttonHref: "/properties?listingType=rent",
          icon: "key",
        },
      ],
    },
    {
      label: "Selling",
      cards: [
        {
          title: "List your property with confidence",
          description:
            "Professional copy, photography guidance, and portal syndication help your listing stand out to serious buyers and tenants.",
          buttonLabel: "Start a listing enquiry",
          buttonHref: "/contact",
          icon: "house",
        },
        {
          title: "Get a fair market valuation",
          description:
            "We benchmark your property against recent transactions in your micro-market so your asking price is competitive yet realistic.",
          buttonLabel: "Request a valuation",
          buttonHref: "/contact",
          icon: "wallet",
        },
        {
          title: "Reach qualified buyers faster",
          description:
            "Targeted marketing, inquiry screening, and visit scheduling save you time while we keep you updated with transparent feedback.",
          buttonLabel: "Talk to marketing",
          buttonHref: "/contact",
          icon: "key",
        },
      ],
    },
  ],
  footerLine: "Looking to spotlight a unique property with expert marketing?",
  footerCtaLabel: "Let's chat",
  footerCtaHref: "/contact",
};
