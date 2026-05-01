import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-1/Blogs";
import Categories from "@/components/common/Categories";
import Cities from "@/components/homes/home-1/Cities";
import HelpCenter from "@/components/homes/home-1/HelpCenter";
import Hero from "@/components/homes/home-1/Hero";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";
import Partners from "@/components/homes/home-1/Partners";
import Properties from "@/components/homes/home-1/Properties";
import Properties2 from "@/components/homes/home-1/Properties2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import connectDB from "@/lib/mongoose";
import PropertyModel from "@/models/Property";
import TestimonialModel from "@/models/Testimonial";
import BlogModel from "@/models/Blog";
import HeroSectionModel from "@/models/HeroSection";
import ContactInfoModel from "@/models/ContactInfo";
import { getPageSeo } from "@/lib/seo";
import mongoose from "mongoose";

export async function generateMetadata() {
  const { metadata } = await getPageSeo("home", {
    title: "Home | Global Realty - Real Estate",
    description: "Find your dream property with Global Realty",
  });
  return metadata;
}

async function getHomePageData() {
  try {
    await connectDB();

    const [properties, testimonials, blogs, heroSlides, contactInfo, topCitiesRaw] =
      await Promise.all([
        PropertyModel.find({ isActive: { $ne: false } })
          .sort({ createdAt: -1 })
          .limit(9)
          .lean()
          .catch(() => []),
        TestimonialModel.find({ isApproved: true, isActive: true })
          .sort({ createdAt: -1 })
          .limit(9)
          .lean()
          .catch(() => []),
        BlogModel.find({ status: "published" })
          .sort({ publishedAt: -1, createdAt: -1 })
          .limit(6)
          .lean()
          .catch(() => []),
        HeroSectionModel.find({ isActive: true })
          .sort({ order: 1 })
          .limit(5)
          .lean()
          .catch(() => []),
        ContactInfoModel.findOne().lean().catch(() => null),
        PropertyModel.aggregate([
          { $match: { isActive: { $ne: false }, city: { $type: "objectId" } } },
          { $group: { _id: "$city", propertyCount: { $sum: 1 } } },
          { $sort: { propertyCount: -1 } },
          { $limit: 7 },
        ]).catch(() => []),
      ]);

    let topCities = [];
    if (topCitiesRaw.length) {
      const cityIds = topCitiesRaw.map((c) => c._id).filter(Boolean);
      const cities = await mongoose.connection
        .collection("cities")
        .find({ _id: { $in: cityIds } })
        .project({ name: 1, image: 1, slug: 1 })
        .toArray();

      const cityMap = new Map(cities.map((c) => [String(c._id), c]));
      topCities = topCitiesRaw
        .map((row) => {
          const city = cityMap.get(String(row._id));
          if (!city?.name) return null;
          return {
            _id: String(city._id),
            cityName: city.name,
            citySlug: city.slug || "",
            image: city.image || "",
            propertyCount: row.propertyCount || 0,
          };
        })
        .filter(Boolean);
    }

    return {
      properties: JSON.parse(JSON.stringify(properties)),
      testimonials: JSON.parse(JSON.stringify(testimonials)),
      blogs: JSON.parse(JSON.stringify(blogs)),
      heroSlides: JSON.parse(JSON.stringify(heroSlides)),
      topCities: JSON.parse(JSON.stringify(topCities)),
      contactInfo: contactInfo ? JSON.parse(JSON.stringify(contactInfo)) : null,
    };
  } catch {
    return {
      properties: [],
      testimonials: [],
      blogs: [],
      heroSlides: [],
      topCities: [],
      contactInfo: null,
    };
  }
}

export default async function Home() {
  const { properties, testimonials, blogs, heroSlides, topCities, contactInfo } =
    await getHomePageData();

  return (
    <>
      <Header1 />
      <Hero heroSlides={heroSlides} />
      <div className="main-content">
        <Categories />
        <Properties properties={properties} />
        <HelpCenter />
        <LoanCalculator />
        <Cities cities={topCities} />
        <Properties2 properties={properties} />
        <Partners />
        <Blogs blogs={blogs} />
        <Testimonials testimonials={testimonials} />
      </div>
      <Footer1 contactInfo={contactInfo} />
    </>
  );
}
