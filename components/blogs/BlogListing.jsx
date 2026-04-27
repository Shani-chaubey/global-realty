"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";
import { SkeletonCard } from "@/components/ui/Skeleton";

const fetcher = (url) => api.get(url).then((r) => r.data);

function BlogCard({ blog }) {
  const publishDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

  return (
    <div className="blog-article-item">
      <div className="article-thumb">
        <Link href={`/blog/${blog.slug || blog._id}`}>
          {blog.featuredImage ? (
            <Image src={blog.featuredImage} alt={blog.title} width={400} height={250} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: "0.75rem 0.75rem 0 0" }} />
          ) : (
            <div style={{ width: "100%", height: 220, background: "#e5e7eb", borderRadius: "0.75rem 0.75rem 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>📝</div>
          )}
        </Link>
      </div>
      <div className="article-content" style={{ padding: "1rem" }}>
        {blog.category && (
          <a href={`/blog?category=${blog.category._id}`} className="lst-blog-cat">{blog.category.name}</a>
        )}
        <h3 style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          <Link href={`/blog/${blog.slug || blog._id}`} className="text-lg fw-6 text-color-heading" style={{ overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
            {blog.title}
          </Link>
        </h3>
        {blog.excerpt && <p className="lst-blog-excerpt">{blog.excerpt}</p>}
        <div className="lst-blog-meta">
          <span>{blog.author}</span>
          <span>
            {publishDate && <span>{publishDate}</span>}
            {blog.readTime && <span> · {blog.readTime} min read</span>}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BlogListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "",
    page: parseInt(searchParams.get("page") || "1"),
  });

  const { data: catsData } = useSWR("/blog-categories", fetcher);
  const queryString = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "" && v !== null))).toString();
  const { data, isLoading } = useSWR(`/blogs?${queryString}`, fetcher);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  useEffect(() => {
    const params = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")));
    router.replace(`/blog?${params}`, { scroll: false });
  }, [filters]);

  const blogs = data?.data || [];
  const pagination = data?.pagination;

  return (
    <section className="flat-section">
      <div className="tf-container">
        <div className="lst-filter-card">
          <div className="lst-filter-row">
            <input type="text" placeholder="Search blogs..." className="lst-input" value={filters.keyword} onChange={(e) => updateFilter("keyword", e.target.value)} />
            <select className="lst-input lst-input--select" value={filters.category} onChange={(e) => updateFilter("category", e.target.value)}>
              <option value="">All Categories</option>
              {catsData?.data?.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            {(filters.keyword || filters.category) && (
              <button onClick={() => setFilters({ keyword: "", category: "", page: 1 })} className="lst-btn-clear">Clear</button>
            )}
          </div>
        </div>

        <p className="lst-results-count" style={{ marginBottom: "1rem" }}>
          {isLoading ? "Loading..." : `${pagination?.total || 0} articles found`}
        </p>

        {isLoading ? (
          <div className="row">
            {[...Array(6)].map((_, i) => <div key={i} className="col-xl-4 col-md-6 mb-4"><SkeletonCard /></div>)}
          </div>
        ) : blogs.length === 0 ? (
          <div className="lst-empty">
            <div className="lst-empty__icon">📝</div>
            <h3 className="lst-empty__title">No Articles Found</h3>
            <p className="lst-empty__text">Try adjusting your search</p>
          </div>
        ) : (
          <>
            <div className="row">
              {blogs.map((blog) => (
                <div key={blog._id} className="col-xl-4 col-md-6 mb-4"><BlogCard blog={blog} /></div>
              ))}
            </div>
            {pagination && pagination.pages > 1 && (
              <div className="lst-pagination">
                <button onClick={() => updateFilter("page", filters.page - 1)} disabled={filters.page <= 1} className="lst-page-btn">Previous</button>
                {[...Array(Math.min(pagination.pages, 5))].map((_, i) => (
                  <button key={i + 1} onClick={() => updateFilter("page", i + 1)} className={`lst-page-btn${filters.page === i + 1 ? " lst-page-btn--active" : ""}`}>{i + 1}</button>
                ))}
                <button onClick={() => updateFilter("page", filters.page + 1)} disabled={filters.page >= pagination.pages} className="lst-page-btn">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
