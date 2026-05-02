"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useComparison, MAX_COMPARE } from "./PropertyComparison";

export default function CompareBar() {
  const { ids, count, clearAll } = useComparison();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || count === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1f2937",
        color: "#fff",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.25)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Compare ({count}/{MAX_COMPARE} selected)
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {ids.map((id, i) => (
            <div
              key={id}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--color-primary, #F1913D)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button
          onClick={clearAll}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            padding: "0.4rem 1rem",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Clear All
        </button>
        <Link
          href="/compare"
          style={{
            background: "var(--color-primary, #F1913D)",
            color: "#fff",
            padding: "0.4rem 1.25rem",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
            display: "inline-block",
          }}
        >
          Compare Now →
        </Link>
      </div>
    </div>
  );
}
