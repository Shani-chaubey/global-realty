import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import connectDB from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug }).populate("category", "name").lean();
    if (!blog) return { title: "Blog Not Found" };
    return {
      title: blog.metaTitle || `${blog.title} | Proty Blog`,
      description: blog.metaDescription || blog.excerpt,
    };
  } catch {
    return { title: "Blog | Proty" };
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let blog = null;
  let relatedBlogs = [];

  try {
    await connectDB();
    const query = slug.match(/^[0-9a-fA-F]{24}$/) ? { _id: slug } : { slug };
    blog = await Blog.findOne({ ...query, status: "published" })
      .populate("category", "name slug")
      .lean();

    if (!blog) notFound();

    blog._id = blog._id.toString();
    if (blog.category) blog.category = { ...blog.category, _id: blog.category._id?.toString() };

    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    relatedBlogs = await Blog.find({
      status: "published",
      _id: { $ne: blog._id },
      ...(blog.category ? { category: blog.category._id } : {}),
    })
      .limit(3)
      .select("title slug featuredImage publishedAt readTime author")
      .lean();

    relatedBlogs = relatedBlogs.map((b) => ({ ...b, _id: b._id.toString() }));
  } catch (error) {
    console.error(error);
    notFound();
  }

  const publishDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName={blog.title} />
      <div className="main-content">
        <section className="flat-section">
          <div className="tf-container">
            <div className="row">
              <div className="col-xl-8 col-lg-8">
                <article>
                  {blog.featuredImage && (
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={800}
                        height={450}
                        className="w-full object-cover"
                        style={{ maxHeight: 450 }}
                        priority
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    {blog.category && (
                      <Link href={`/blog?category=${blog.category._id}`} className="text-primary font-medium">
                        {blog.category.name}
                      </Link>
                    )}
                    {publishDate && <span>• {publishDate}</span>}
                    {blog.readTime && <span>• {blog.readTime} min read</span>}
                    <span>• By {blog.author}</span>
                  </div>

                  <h1 className="text-3xl fw-7 text-color-heading mb-4">{blog.title}</h1>

                  {blog.excerpt && (
                    <p className="text-lg text-color-default mb-6 font-medium leading-relaxed">{blog.excerpt}</p>
                  )}

                  <div
                    className="blog-content prose prose-lg max-w-none text-color-default"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                      <span className="text-sm text-gray-500">Tags:</span>
                      {blog.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${tag}`}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              </div>

              <div className="col-xl-4 col-lg-4">
                <div className="tf-sidebar sticky-sidebar">
                  {relatedBlogs.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
                      <h5 className="fw-6 text-color-heading mb-4">Related Articles</h5>
                      <div className="space-y-4">
                        {relatedBlogs.map((b) => (
                          <div key={b._id} className="flex gap-3">
                            {b.featuredImage && (
                              <Image
                                src={b.featuredImage}
                                alt={b.title}
                                width={80}
                                height={60}
                                className="rounded-lg object-cover flex-shrink-0"
                                style={{ width: 80, height: 60 }}
                              />
                            )}
                            <div>
                              <Link
                                href={`/blog/${b.slug || b._id}`}
                                className="text-sm fw-6 text-color-heading hover:text-primary line-clamp-2"
                              >
                                {b.title}
                              </Link>
                              {b.readTime && (
                                <p className="text-xs text-gray-400 mt-1">{b.readTime} min read</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Cta />
      </div>
      <Footer1 />
    </div>
  );
}
