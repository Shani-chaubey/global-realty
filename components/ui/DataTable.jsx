"use client";
import { useState } from "react";

export default function DataTable({
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  searchable = true,
  onSearch,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  if (loading) {
    return (
      <div className="dt-skeleton">
        <div className="dt-skeleton-bar dt-skeleton-bar--head" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="dt-skeleton-bar dt-skeleton-bar--row" />
        ))}
      </div>
    );
  }

  return (
    <div className="dt-root">
      {searchable && (
        <div className="dt-search">
          <div className="dt-search-wrap">
            <svg className="dt-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="dt-search-input"
            />
          </div>
        </div>
      )}
      <div className="dt-scroll">
        <table className="dt-table">
          <thead className="dt-thead">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="dt-th" style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="dt-tbody">
            {!data?.length ? (
              <tr>
                <td colSpan={columns.length} className="dt-empty">
                  <div className="dt-empty-inner">
                    <svg className="dt-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4V9m3 8H6a2 2 0 01-2-2V7a2 2 0 012-2h12.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V15a2 2 0 01-2 2z" />
                    </svg>
                    <p className="dt-empty-text">No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row._id || i}>
                  {columns.map((col) => (
                    <td key={col.key} className="dt-td">
                      {col.render ? col.render(row) : (row[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.pages > 1 && (
        <div className="dt-pagination">
          <p className="dt-page-info">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </p>
          <div className="dt-page-btns">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="dt-page-btn"
            >
              Prev
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="dt-page-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
