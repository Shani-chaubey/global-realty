const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is required");
}

const seedData = {
  key: "default",
  stats: {
    listingUsed: 32,
    listingLimit: 50,
    pending: 2,
    favorites: 6,
    reviews: 1483,
  },
  properties: [
    {
      id: 1,
      title: "Modern Family Home",
      imageSrc: "/images/home/house-1.jpg",
      postingDate: "Oct 14, 2024",
      price: 245000,
      expiryDate: "Dec 31, 2026",
      status: "Approved",
    },
    {
      id: 2,
      title: "Luxury Downtown Apartment",
      imageSrc: "/images/home/house-2.jpg",
      postingDate: "Nov 02, 2024",
      price: 320000,
      expiryDate: "Jan 15, 2027",
      status: "Pending",
    },
  ],
  favorites: [
    {
      id: 3,
      title: "Garden Villa",
      imageSrc: "/images/home/house-3.jpg",
      postingDate: "Nov 08, 2024",
      price: 480000,
      expiryDate: "Feb 28, 2027",
    },
  ],
  saveSearches: [
    {
      id: 1,
      title: "Alaska",
      status: "for-rent",
      state: "alaska",
      email: "admin@proty.com",
      publishedAt: "October 14, 2024",
    },
    {
      id: 2,
      title: "Baths",
      status: "for-sale",
      state: "baths",
      email: "admin@proty.com",
      publishedAt: "October 20, 2024",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Bessie Cooper",
      avatar: "/images/avatar/avt-png13.png",
      message: "Great response time and very professional support.",
      rating: 5,
      timeAgo: "3 days ago",
    },
    {
      id: 2,
      name: "Annette Black",
      avatar: "/images/avatar/avt-png14.png",
      message: "Smooth process from listing to customer handoff.",
      rating: 5,
      timeAgo: "5 days ago",
    },
  ],
  messages: [
    {
      id: 1,
      name: "Themesflat",
      avatar: "/images/avatar/avt-png9.png",
      message: "Please review the latest listing update.",
      timeAgo: "3 days ago",
    },
    {
      id: 2,
      name: "ThemeMu",
      avatar: "/images/avatar/avt-png10.png",
      message: "Client asked for a call back this week.",
      timeAgo: "4 days ago",
    },
  ],
  package: {
    name: "Basic",
    price: 19,
    period: "month",
    description: "Automatically reach potential customers",
    features: [
      "Listing free",
      "Support 24/7",
      "Quick access to customers",
      "Auto refresh ads",
    ],
  },
  profile: {
    fullName: "Demo Agent",
    description: "Helping families find homes across key metro areas.",
    company: "Global Realty",
    position: "Senior Agent",
    officeNumber: "1332565894",
    officeAddress: "10 Bringhurst St, Houston, TX",
    job: "Realtor",
    email: "admin@proty.com",
    phone: "1332565894",
    location: "634 E 236th St, Bronx, NY 10466",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [42, 45, 70, 65, 140, 130],
  },
};

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();

    await db.collection("admins").updateOne(
      { username: "admin" },
      { $set: { username: "admin", password: "admin123", role: "super-admin" } },
      { upsert: true }
    );

    await db.collection("dashboard_data").updateOne(
      { key: "default" },
      { $set: seedData },
      { upsert: true }
    );

    console.log("Dashboard seed completed successfully.");
    console.log("Admin login -> username: admin | password: admin123");
  } finally {
    await client.close();
  }
}

run().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
