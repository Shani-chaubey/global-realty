"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ properties: [], blogs: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults({ properties: [], blogs: [] });
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ properties: [], blogs: [] });
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/search?q=${encodeURIComponent(query)}`);
        if (data.success) setResults(data.data);
      } catch {
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const hasResults = results.properties.length > 0 || results.blogs.length > 0;
  const formatPrice = (p) => p.priceType === "on-request" ? "On Request" : `₹${Number(p.price || 0).toLocaleString("en-IN")}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded-full hover:border-primary hover:text-primary transition-colors"
        aria-label="Open search"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search...</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 flex items-start justify-center pt-16 px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
                placeholder="Search properties and blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {loading && <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl">×</button>
            </div>

            {query.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {!hasResults && !loading && (
                  <div className="p-8 text-center text-gray-400">
                    {query.length < 2 ? "Type at least 2 characters..." : "No results found"}
                  </div>
                )}

                {results.properties.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700/50">
                      Properties ({results.properties.length})
                    </p>
                    {results.properties.map((p) => {
                      const img = p.images?.find((i) => i.isPrimary) || p.images?.[0];
                      return (
                        <Link
                          key={p._id}
                          href={`/property-detail-v1/${p.slug || p._id}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {img ? (
                            <Image src={img.url} alt={p.title} width={48} height={36} className="rounded object-cover flex-shrink-0" style={{ width: 48, height: 36 }} />
                          ) : (
                            <div className="w-12 h-9 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 dark:text-white text-sm line-clamp-1">{p.title}</p>
                            <p className="text-xs text-gray-400">{p.city} • {formatPrice(p)}</p>
                          </div>
                          <span className="text-xs text-gray-400 capitalize">{p.listingType}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {results.blogs.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700/50">
                      Blogs ({results.blogs.length})
                    </p>
                    {results.blogs.map((b) => (
                      <Link
                        key={b._id}
                        href={`/blog/${b.slug || b._id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {b.featuredImage ? (
                          <Image src={b.featuredImage} alt={b.title} width={48} height={36} className="rounded object-cover flex-shrink-0" style={{ width: 48, height: 36 }} />
                        ) : (
                          <div className="w-12 h-9 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 flex items-center justify-center text-xs">📝</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 dark:text-white text-sm line-clamp-1">{b.title}</p>
                          {b.publishedAt && (
                            <p className="text-xs text-gray-400">{new Date(b.publishedAt).toLocaleDateString("en-IN")}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <div className="p-4 border-t dark:border-gray-700">
                  <Link
                    href={`/properties?keyword=${query}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-primary hover:underline"
                  >
                    Search all properties for "{query}" →
                  </Link>
                </div>
              </div>
            )}

            {!query && (
              <div className="p-6 text-center text-gray-400 text-sm">
                Start typing to search properties and blog posts
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
