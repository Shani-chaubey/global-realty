"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);

function BlogSkeleton() {
  return (
    <div className="blog-article-item style-2 lst-blog-skeleton">
      <div className="image-wrap lst-blog-skeleton__img" />
      <div className="article-content" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div className="lst-blog-skeleton__bar" style={{ width: "33%" }} />
        <div className="lst-blog-skeleton__bar lst-blog-skeleton__bar--md" />
        <div className="lst-blog-skeleton__bar lst-blog-skeleton__bar--md" style={{ width: "80%" }} />
        <div className="lst-blog-skeleton__bar" style={{ width: "25%" }} />
      </div>
    </div>
  );
}

export default function Blogs2() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const limit = 9;

  const { data: categoriesData } = useSWR("/blog-categories", fetcher);
  const { data, isLoading } = useSWR(
    `/blogs?page=${page}&limit=${limit}&status=published${selectedCategory ? `&category=${selectedCategory}` : ""}`,
    fetcher
  );

  const posts = data?.data || [];
  const pagination = data?.pagination;
  const categories = categoriesData?.data || [];

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  return (
    <section className="section-blog-grid">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-title" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, flex: "0 0 auto" }}>Blog Grid</h2>
              <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "flex-end" }}>
                <button onClick={() => handleCategoryChange("")} className={`lst-cat-pill${!selectedCategory ? " lst-cat-pill--active" : ""}`}>All</button>
                {categories.map((cat) => (
                  <button key={cat._id} onClick={() => handleCategoryChange(cat._id)} className={`lst-cat-pill${selectedCategory === cat._id ? " lst-cat-pill--active" : ""}`}>{cat.name}</button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="grid-layout-3">
                {[...Array(6)].map((_, i) => <BlogSkeleton key={i} />)}
              </div>
            ) : posts.length === 0 ? (
              <div className="lst-empty">
                <div className="lst-empty__icon">📝</div>
                <h3 className="lst-empty__title">No blogs found</h3>
                <p className="lst-empty__text">{selectedCategory ? "Try selecting a different category." : "No published blogs yet."}</p>
                {selectedCategory && <button onClick={() => handleCategoryChange("")} className="lst-empty__btn">View All Blogs</button>}
              </div>
            ) : (
              <div className="grid-layout-3">
                {posts.map((post) => (
                  <div key={post._id} className="blog-article-item style-2">
                    <div className="image-wrap">
                      {post.featuredImage ? (
                        <Image className="lazyload" alt={post.title} width={600} height={396} src={post.featuredImage} style={{ objectFit: "cover", height: "100%", width: "100%" }} unoptimized />
                      ) : (
                        <div style={{ width: "100%", height: "13rem", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg style={{ width: "2.5rem", height: "2.5rem", color: "#9ca3af" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {post.category?.name && (
                        <div className="box-tag">
                          <div className="tag-item text-4 text_white fw-6">
                            {post.category.name}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="article-content">
                      <div className="time">
                        <div className="icons">
                          <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="8" stroke="#5C5E61" strokeWidth="1" fill="none" />
                            <path d="M9 5v4l2.5 2.5" stroke="#5C5E61" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="fw-5">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                            : new Date(post.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <h4 className="title line-clamp-3">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      {post.excerpt && (
                        <p className="lst-blog-excerpt">{post.excerpt}</p>
                      )}
                      <Link href={`/blog/${post.slug}`} className="tf-btn-link">
                        <span>Read More</span>
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666z" stroke="#F1913D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.667 10h6.666M10 13.333L13.333 10 10 6.667" stroke="#F1913D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pagination && pagination.pages > 1 && (
              <ul className="wg-pagination justify-center" style={{ marginTop: "32px" }}>
                <li className="arrow">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    style={{ cursor: page <= 1 ? "not-allowed" : "pointer", opacity: page <= 1 ? 0.4 : 1 }}
                  >
                    <i className="icon-arrow-left" />
                  </button>
                </li>
                {[...Array(pagination.pages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.pages ||
                    Math.abs(pageNum - page) <= 1
                  ) {
                    return (
                      <li key={pageNum} className={page === pageNum ? "active" : ""}>
                        <button onClick={() => setPage(pageNum)}>{pageNum}</button>
                      </li>
                    );
                  }
                  if (Math.abs(pageNum - page) === 2) {
                    return <li key={pageNum}><span>...</span></li>;
                  }
                  return null;
                })}
                <li className="arrow">
                  <button
                    disabled={page >= pagination.pages}
                    onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                    style={{ cursor: page >= pagination.pages ? "not-allowed" : "pointer", opacity: page >= pagination.pages ? 0.4 : 1 }}
                  >
                    <i className="icon-arrow-right" />
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
