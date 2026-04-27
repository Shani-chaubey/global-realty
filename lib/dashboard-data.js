import { getDb } from "@/lib/db";

const fallbackData = {
  stats: {
    listingUsed: 0,
    listingLimit: 50,
    pending: 0,
    favorites: 0,
    reviews: 0,
  },
  properties: [],
  favorites: [],
  saveSearches: [],
  reviews: [],
  messages: [],
  package: {
    name: "Basic",
    price: 19,
    period: "month",
    description: "Automatically reach potential customers",
    features: ["Listing free", "Support 24/7"],
  },
  profile: {
    fullName: "Admin",
    description: "",
    company: "",
    position: "",
    officeNumber: "",
    officeAddress: "",
    job: "",
    email: "",
    phone: "",
    location: "",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [12, 20, 18, 28, 22, 30],
  },
};

function normalizeDoc(doc) {
  if (!doc) {
    return fallbackData;
  }

  return {
    ...fallbackData,
    ...doc,
    stats: { ...fallbackData.stats, ...(doc.stats || {}) },
    package: { ...fallbackData.package, ...(doc.package || {}) },
    profile: { ...fallbackData.profile, ...(doc.profile || {}) },
    chart: { ...fallbackData.chart, ...(doc.chart || {}) },
    properties: Array.isArray(doc.properties) ? doc.properties : [],
    favorites: Array.isArray(doc.favorites) ? doc.favorites : [],
    saveSearches: Array.isArray(doc.saveSearches) ? doc.saveSearches : [],
    reviews: Array.isArray(doc.reviews) ? doc.reviews : [],
    messages: Array.isArray(doc.messages) ? doc.messages : [],
  };
}

export async function getDashboardData() {
  const db = await getDb();
  const doc = await db
    .collection("dashboard_data")
    .findOne({ key: "default" }, { projection: { _id: 0, key: 0 } });

  return normalizeDoc(doc);
}
