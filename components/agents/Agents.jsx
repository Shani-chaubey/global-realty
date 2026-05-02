"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownSelect from "../common/DropdownSelect";
import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);
const PAGE_SIZE = 12;

export default function Agents() {
  const { data, isLoading } = useSWR("/cms/team-agents", fetcher);
  const agents = data?.data || [];

  const [q, setQ] = useState("");
  const [agency, setAgency] = useState("All agency");
  const [city, setCity] = useState("All location");
  const [sort, setSort] = useState("Sort by (Default)");
  const [page, setPage] = useState(1);

  const agencyOptions = useMemo(() => {
    const set = new Set(
      agents.map((a) => (a.agency || "").trim()).filter(Boolean),
    );
    return ["All agency", ...[...set].sort()];
  }, [agents]);

  const cityOptions = useMemo(() => {
    const set = new Set(
      agents.map((a) => (a.city || "").trim()).filter(Boolean),
    );
    return ["All location", ...[...set].sort()];
  }, [agents]);

  const filtered = useMemo(() => {
    let list = [...agents];
    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter(
        (a) =>
          (a.name || "").toLowerCase().includes(qq) ||
          (a.role || "").toLowerCase().includes(qq),
      );
    }
    if (agency && agency !== "All agency") {
      list = list.filter((a) => (a.agency || "") === agency);
    }
    if (city && city !== "All location") {
      list = list.filter((a) => (a.city || "") === city);
    }
    if (sort === "Newest") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    } else if (sort === "Oldest") {
      list.sort(
        (a, b) =>
          new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
    } else {
      list.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", undefined, {
          sensitivity: "base",
        }),
      );
    }
    return list;
  }, [agents, q, agency, city, sort]);

  const total = filtered.length;
  const totalPages =
    total === 0 ? 0 : Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe =
    totalPages === 0 ? 1 : Math.min(page, totalPages);
  const slice = filtered.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE,
  );

  const detailHref = (a) =>
    `/agents-details/${a.slug || a._id}`;

  return (
    <section className="section-agent">
      <div className="tf-container">
        <div className="row">
          <div className="box-title style-2 mb-48">
            <h2>Agents</h2>
            <div className="wrap-sort">
              <form onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                  <input
                    className=""
                    type="text"
                    placeholder="Agent name"
                    name="name"
                    tabIndex={2}
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    aria-required="true"
                  />
                </fieldset>
              </form>

              <DropdownSelect
                options={agencyOptions}
                selectedValue={agency}
                onChange={(v) => {
                  setAgency(v);
                  setPage(1);
                }}
                addtionalParentClass=""
              />

              <DropdownSelect
                options={cityOptions}
                selectedValue={city}
                onChange={(v) => {
                  setCity(v);
                  setPage(1);
                }}
                addtionalParentClass=""
              />

              <DropdownSelect
                options={["Sort by (Default)", "Newest", "Oldest"]}
                selectedValue={sort}
                onChange={setSort}
                addtionalParentClass="select-sort style-2"
              />
            </div>
          </div>
          {isLoading ? (
            <p className="text-1">Loading agents…</p>
          ) : (
            <div className="tf-grid-layout-2 lg-col-4 md-col-3 sm-col-2">
              {slice.map((agent) => (
                <div
                  key={String(agent._id)}
                  className="agent-item hover-img"
                >
                  <div className="image-wrap">
                    <Link href={detailHref(agent)}>
                      <Image
                        className="lazyload"
                        data-src={agent.photo || "/images/section/agent-item-1.jpg"}
                        alt=""
                        width={435}
                        height={585}
                        src={
                          agent.photo || "/images/section/agent-item-1.jpg"
                        }
                      />
                    </Link>
                    <ul className="tf-social style-3">
                      {agent.socialFacebook ? (
                        <li>
                          <a
                            href={agent.socialFacebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-fb" />
                          </a>
                        </li>
                      ) : null}
                      {agent.socialTwitter ? (
                        <li>
                          <a
                            href={agent.socialTwitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-X" />
                          </a>
                        </li>
                      ) : null}
                      {agent.socialLinkedin ? (
                        <li>
                          <a
                            href={agent.socialLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-linked" />
                          </a>
                        </li>
                      ) : null}
                      {agent.socialInstagram ? (
                        <li>
                          <a
                            href={agent.socialInstagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-ins" />
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                  <div className="content">
                    <div className="author">
                      <h5 className="name lh-30">
                        <Link href={detailHref(agent)}>
                          {agent.name}
                        </Link>
                      </h5>
                      <p className="text-2 lh-18">
                        {agent.role || "Agent"}
                      </p>
                    </div>
                    <div className="wrap-btn-icon">
                      {agent.phone ? (
                        <a
                          href={`tel:${agent.phone.replace(/\s/g, "")}`}
                          className="btn-icon"
                        >
                          <i className="icon-phone-3" />
                        </a>
                      ) : null}
                      {agent.email ? (
                        <a
                          href={`mailto:${agent.email}`}
                          className="btn-icon"
                        >
                          <i className="icon-letter" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoading && total === 0 ? (
            <p className="text-1">No agents found.</p>
          ) : null}
          {totalPages > 0 ? (
            <div className="wrap-pagination">
              <p className="text-1">
                {`${(pageSafe - 1) * PAGE_SIZE + 1} – ${Math.min(
                  pageSafe * PAGE_SIZE,
                  total,
                )} of ${total} agent${total === 1 ? "" : "s"}`}
              </p>
              <ul className="wg-pagination justify-center">
                <li className="arrow">
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0"
                    disabled={pageSafe <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    <i className="icon-arrow-left" />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <li key={p} className={p === pageSafe ? "active" : ""}>
                      <button
                        type="button"
                        className="border-0 bg-transparent"
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    </li>
                  ),
                )}
                <li className="arrow">
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0"
                    disabled={pageSafe >= totalPages}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    aria-label="Next page"
                  >
                    <i className="icon-arrow-right" />
                  </button>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
