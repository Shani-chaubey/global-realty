"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTE_LABELS = {
  "/admin": "Dashboard",
  "/admin/properties": "All Properties",
  "/admin/properties/add": "Add Property",
  "/admin/property-types": "Property Types",
  "/admin/property-subtypes": "Property Sub Types",
  "/admin/amenities": "Amenities",
  "/admin/blogs": "All Blogs",
  "/admin/blogs/add": "Add Blog",
  "/admin/blog-categories": "Blog Categories",
  "/admin/inquiries": "Inquiries",
  "/admin/newsletter": "Newsletter",
  "/admin/seo": "SEO Settings",
  "/admin/site-config": "Site Config",
  "/admin/theme": "Theme Settings",
  "/admin/cms/hero": "Hero Slides",
  "/admin/cms/about": "About Section",
  "/admin/cms/testimonials": "Testimonials",
  "/admin/cms/faqs": "FAQs",
  "/admin/cms/banners": "Banners",
  "/admin/cms/contact-info": "Contact Info",
};

function getBreadcrumbs(pathname) {
  const crumbs = [{ label: "Admin", href: "/admin" }];
  const label = ROUTE_LABELS[pathname];
  if (label && pathname !== "/admin") crumbs.push({ label, href: pathname });
  return crumbs;
}

export default function AdminHeader({ onMenuToggle }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const crumbs = getBreadcrumbs(pathname);

  useEffect(() => {
    const saved = localStorage.getItem("adminDarkMode");
    const dark = saved === "true";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("adminDarkMode", String(next));
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className="admin-header">
      <button onClick={onMenuToggle} className="admin-header__menu-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav className="admin-header__breadcrumbs">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} style={{ display: "flex", alignItems: "center", gap: "0.375rem", minWidth: 0 }}>
            {i > 0 && (
              <span className="admin-breadcrumb-sep">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
            {i < crumbs.length - 1 ? (
              <Link href={crumb.href} className="admin-breadcrumb-link">{crumb.label}</Link>
            ) : (
              <span className="admin-breadcrumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="admin-header__actions">
        <button
          onClick={toggleDark}
          className="admin-header__icon-btn"
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <Link href="/admin/inquiries" className="admin-header__icon-btn" title="Inquiries">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Link>

        <div className="admin-header__divider" />

        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="admin-header__user-btn">
            <div className="admin-header__avatar">A</div>
            <span className="admin-header__username">Admin</span>
            <svg
              className={`admin-header__chevron${dropdownOpen ? " admin-header__chevron--open" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="admin-header__dropdown">
              <Link
                href="/admin/site-config"
                className="admin-header__dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              <div className="admin-header__dropdown-divider" />
              <Link
                href="/api/admin/logout"
                prefetch={false}
                className="admin-header__dropdown-item admin-header__dropdown-item--danger"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
