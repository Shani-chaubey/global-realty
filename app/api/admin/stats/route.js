import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";
import Blog from "@/models/Blog";
import Inquiry from "@/models/Inquiry";
import Newsletter from "@/models/Newsletter";

export async function GET() {
  try {
    await connectDB();
    const [
      totalProperties,
      activeProperties,
      totalBlogs,
      publishedBlogs,
      totalInquiries,
      newInquiries,
      newsletterSubscribers,
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ isActive: true }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "new" }),
      Newsletter.countDocuments({ isSubscribed: true }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        properties: { total: totalProperties, active: activeProperties },
        blogs: { total: totalBlogs, published: publishedBlogs },
        inquiries: { total: totalInquiries, new: newInquiries },
        newsletter: { subscribers: newsletterSubscribers },
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
