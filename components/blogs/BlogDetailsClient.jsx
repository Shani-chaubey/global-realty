"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogDetailsClient({ blog }) {
  if (!blog) return null;
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const publishDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
    : blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
    : "";

  React.useEffect(() => {
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, []);

  React.useEffect(() => {
    fetch("/api/blog-categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <section className="section-blog-details" style={{ padding: "18px 0 8px" }}>
      <div className="tf-container">
        <div className="row" style={{ rowGap: "28px" }}>
          <div className="col-lg-8">
            <article
              style={{
                background: "#fff",
                border: "1px solid #eef2f7",
                borderRadius: 18,
                boxShadow: "0 12px 35px rgba(17,24,39,0.06)",
                padding: "26px",
              }}
            >
            <div className="heading" style={{ marginBottom: "20px" }}>
              <h2 className="title-heading" style={{ marginBottom: "14px", lineHeight: 1.25 }}>{blog.title}</h2>
              <div className="meta flex" style={{ gap: "14px", flexWrap: "wrap" }}>
                {blog.author && (
                  <div className="meta-item flex align-center" style={{ gap: "6px", background: "#f9fafb", borderRadius: 999, padding: "6px 12px" }}>
                    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25 15.75V14.25C14.25 13.4544 13.9339 12.6913 13.3713 12.1287C12.8087 11.5661 12.0456 11.25 11.25 11.25H6.75C5.95435 11.25 5.19129 11.5661 4.62868 12.1287C4.06607 12.6913 3.75 13.4544 3.75 14.25V15.75" stroke="#A8ABAE" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#A8ABAE" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-color-primary">{blog.author}</p>
                  </div>
                )}
                {blog.category?.name && (
                  <div className="meta-item flex align-center" style={{ gap: "6px", background: "#f9fafb", borderRadius: 999, padding: "6px 12px" }}>
                    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01" stroke="#A8ABAE" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-color-primary">{blog.category.name}</p>
                  </div>
                )}
                {publishDate && (
                  <div className="meta-item flex align-center" style={{ gap: "6px", background: "#f9fafb", borderRadius: 999, padding: "6px 12px" }}>
                    <p>{publishDate}</p>
                  </div>
                )}
              </div>
            </div>

            {blog.excerpt && (
              <p className="fw-5 text-color-heading mb-30" style={{ marginBottom: "22px", lineHeight: 1.8, color: "#4b5563" }}>{blog.excerpt}</p>
            )}

            {blog.featuredImage && (
              <div className="image-wrap mb-30" style={{ marginBottom: "26px" }}>
                <Image
                  alt={blog.title}
                  width={840}
                  height={473}
                  src={blog.featuredImage}
                  style={{ width: "100%", height: "auto", borderRadius: 14, objectFit: "cover", boxShadow: "0 10px 28px rgba(0,0,0,0.14)" }}
                  unoptimized
                />
              </div>
            )}

            {blog.content ? (
              <div
                className="blog-content mb-30"
                style={{ marginBottom: "28px", lineHeight: 1.85, color: "#374151" }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <div className="wrap-content mb-30">
                <p style={{ color: "#6b7280", fontStyle: "italic" }}>No content available for this post.</p>
              </div>
            )}

            {/* Tags & Social Share */}
            <div
              className="tag-wrap flex justify-between items-center"
              style={{
                marginTop: "10px",
                borderTop: "1px solid #eef2f7",
                paddingTop: "18px",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div className="tags">
                {blog.tags?.length > 0 && (
                  <>
                    <p style={{ marginBottom: "8px", fontWeight: 600 }}>Tags:</p>
                    <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {blog.tags.map((tag, i) => (
                        <Link
                          key={i}
                          href={`/blogs?tag=${encodeURIComponent(tag)}`}
                          style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 999,
                            padding: "6px 12px",
                            fontSize: "0.82rem",
                            color: "#4b5563",
                            textDecoration: "none",
                          }}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="wrap-social">
                <p style={{ marginBottom: "8px", fontWeight: 600 }}>Share this post:</p>
                <ul className="tf-social style-1" style={{ display: "flex", gap: "10px" }}>
                  <li><a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noreferrer"><i className="icon-fb" /></a></li>
                  <li><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noreferrer"><i className="icon-X" /></a></li>
                  <li><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noreferrer"><i className="icon-linked" /></a></li>
                </ul>
              </div>
            </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sidebar" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Search */}
              <div className="widget-search" style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 16, padding: "18px 16px", boxShadow: "0 10px 30px rgba(17,24,39,0.06)" }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const val = e.target.q.value;
                    if (val) router.push(`/blogs?q=${encodeURIComponent(val)}`);
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <fieldset style={{ flex: 1, margin: 0 }}>
                    <input
                      type="text"
                      name="q"
                      placeholder="Search blog posts..."
                      style={{ borderRadius: 12, border: "1px solid #e5e7eb", padding: "12px 14px", height: "48px", fontSize: "0.96rem", width: "100%" }}
                    />
                  </fieldset>
                  <button
                    type="submit"
                    aria-label="Search blogs"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className="icon-MagnifyingGlass" />
                  </button>
                </form>
              </div>

              {/* Recent Posts */}
              <div className="widget widget-recent-post" style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 16, padding: "18px 16px", boxShadow: "0 10px 30px rgba(17,24,39,0.06)" }}>
                <h5 className="widget-title" style={{ marginBottom: "14px", fontSize: "1.1rem" }}>Recent Posts</h5>
                <RecentPosts currentId={blog._id} />
              </div>

              {/* Categories */}
              <div className="widget widget-categories" style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 16, padding: "18px 16px", boxShadow: "0 10px 30px rgba(17,24,39,0.06)" }}>
                <h5 className="widget-title" style={{ marginBottom: "12px", fontSize: "1.1rem" }}>Categories</h5>
                {categories.length ? (
                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {categories.map((cat) => {
                      const active = String(cat._id) === String(blog.category?._id);
                      return (
                        <li key={cat._id}>
                          <Link
                            href={`/blogs?category=${cat.slug}`}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 12px",
                              borderRadius: 10,
                              border: active ? "1px solid var(--color-primary, #F1913D)" : "1px solid #edf2f7",
                              background: active ? "rgba(241,145,61,0.08)" : "#fff",
                              color: active ? "var(--color-primary, #F1913D)" : "#374151",
                              textDecoration: "none",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                            }}
                          >
                            <span>{cat.name}</span>
                            <span style={{ fontSize: "0.78rem", opacity: 0.85 }}>({cat.blogCount || 0})</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>No categories found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentPosts({ currentId }) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(`/api/blogs?limit=5&status=published`)
      .then((r) => r.json())
      .then((d) => {
        const filtered = (d.data || []).filter((p) => p._id !== currentId).slice(0, 4);
        setPosts(filtered);
      })
      .catch(() => {});
  }, [currentId]);

  if (!posts.length) return <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>No recent posts.</p>;

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {posts.map((post) => (
        <li key={post._id} className="recent-post-item" style={{ display: "flex", gap: "10px", alignItems: "center", paddingBottom: "12px", borderBottom: "1px dashed #e5e7eb" }}>
          <div className="image-wrap">
            {post.featuredImage && (
              <Link href={`/blog-details/${post.slug || post._id}`}>
                <Image src={post.featuredImage} alt={post.title} width={80} height={64} style={{ objectFit: "cover", borderRadius: 8, width: 80, height: 64 }} unoptimized />
              </Link>
            )}
          </div>
          <div className="content">
            <p className="text-4 text-color-default">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <h6>
              <Link href={`/blog-details/${post.slug || post._id}`}>{post.title}</Link>
            </h6>
          </div>
        </li>
      ))}
    </ul>
  );
}
