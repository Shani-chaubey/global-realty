"use client";
import { navLinks } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href="/">
            <Image alt="" src="/images/logo/logo@2x.png" width={272} height={84} />
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="icon-close" />
        </div>
      </div>
      <div className="offcanvas-body inner-mobile-nav">
        <div className="mb-body">
          <ul id="menu-mobile-menu">
            {navLinks.map((item) => (
              <li
                key={item.href}
                className={`menu-item ${
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "current-item"
                    : ""
                }`}
              >
                <Link href={item.href} className="item-menu-mobile">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="support">
            <a href="#" className="text-need">Need help?</a>
            <ul className="mb-info">
              <li>Call Us Now: <span className="number">1-555-678-8888</span></li>
              <li>Support 24/7: <a href="#">themesflat@gmail.com</a></li>
              <li>
                <div className="wrap-social">
                  <p>Follow us:</p>
                  <ul className="tf-social style-2">
                    <li><a href="#"><i className="icon-fb" /></a></li>
                    <li><a href="#"><i className="icon-X" /></a></li>
                    <li><a href="#"><i className="icon-linked" /></a></li>
                    <li><a href="#"><i className="icon-ins" /></a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
