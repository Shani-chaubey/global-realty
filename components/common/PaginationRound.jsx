"use client";

/**
 * Same pill-style pagination as Properties / blogs listing.
 */
export default function PaginationRound({
  page,
  totalPages,
  onPageChange,
  accentVar = "var(--color-primary, #F1913D)",
}) {
  if (!totalPages || totalPages <= 1) return null;

  const btnBase = {
    width: 42,
    height: 42,
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#374151",
    display: "grid",
    placeItems: "center",
    transition: "all 0.2s ease",
  };

  return (
    <ul className="wg-pagination justify-center" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center" }}>
      <li className="arrow">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          aria-label="Previous page"
          style={{
            ...btnBase,
            cursor: page <= 1 ? "not-allowed" : "pointer",
            opacity: page <= 1 ? 0.45 : 1,
          }}
        >
          <i className="icon-arrow-left" />
        </button>
      </li>
      {[...Array(totalPages)].map((_, i) => {
        const p = i + 1;
        if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
          return (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-label={`Page ${p}`}
                aria-current={page === p ? "page" : undefined}
                style={{
                  minWidth: 42,
                  height: 42,
                  padding: "0 12px",
                  borderRadius: 999,
                  border: page === p ? `1px solid ${accentVar}` : "1px solid #e5e7eb",
                  background: page === p ? accentVar : "#fff",
                  color: page === p ? "#fff" : "#374151",
                  fontWeight: page === p ? 700 : 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {p}
              </button>
            </li>
          );
        }
        if (Math.abs(p - page) === 2) {
          return (
            <li key={p}>
              <span style={{ minWidth: 30, display: "inline-block", textAlign: "center", color: "#9ca3af", fontWeight: 700 }}>...</span>
            </li>
          );
        }
        return null;
      })}
      <li className="arrow">
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          aria-label="Next page"
          style={{
            ...btnBase,
            cursor: page >= totalPages ? "not-allowed" : "pointer",
            opacity: page >= totalPages ? 0.45 : 1,
          }}
        >
          <i className="icon-arrow-right" />
        </button>
      </li>
    </ul>
  );
}
