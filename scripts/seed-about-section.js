require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const now = new Date();

  const payload = {
    eyebrow: "Why Choose Our Properties",
    title: "Turning Property Dreams into Real Addresses",
    description:
      "At Truhomes.in, we go beyond property listings - we deliver value, trust, and long-term satisfaction. Here is why smart buyers, investors, and tenants choose us for their real estate needs.",
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Curated Project Portfolio",
      "Trusted Developer Network",
      "Location Advantage",
      "Personalized Guidance",
      "Competitive Pricing & Offers",
      "Expert Market Insights",
    ],
    ctaText: "Read More",
    ctaLink: "/about-us",
    isActive: true,
    updatedAt: now,
  };

  await db.collection("aboutsections").updateMany(
    {},
    {
      $set: { isActive: false, updatedAt: now },
    }
  );

  await db.collection("aboutsections").updateOne(
    { title: payload.title },
    {
      $set: payload,
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );

  console.log("✓ About section seeded/updated");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
