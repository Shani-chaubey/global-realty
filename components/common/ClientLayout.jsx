"use client";
import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import SettingsHandler from "@/components/common/SettingsHandler";
import Login from "@/components/modals/Login";
import Register from "@/components/modals/Register";
import CompareBar from "@/components/compare/CompareBar";
import InquiryModal from "@/components/modals/InquiryModal";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm");
    }
  }, []);

  useEffect(() => {
    const bootstrap = require("bootstrap");
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) modalInstance.hide();
    });
    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) offcanvasInstance.hide();
    });
  }, [pathname]);

  useEffect(() => {
    const WOW = require("@/utlis/wow");
    const wow = new WOW.default({
      animateClass: "animated",
      offset: 100,
      mobile: true,
      live: false,
    });
    wow.init();
  }, [pathname]);

  useEffect(() => {
    const handleSticky = () => {
      const navbar = document.querySelector(".header");
      if (!navbar) return;
      if (window.scrollY > 120) {
        navbar.classList.add("fixed", "header-sticky");
      } else {
        navbar.classList.remove("fixed", "header-sticky");
      }
      if (window.scrollY > 300) {
        navbar.classList.add("is-sticky");
      } else {
        navbar.classList.remove("is-sticky");
      }
    };
    window.addEventListener("scroll", handleSticky);
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
      <Suspense fallback={null}>
        <MobileMenu />
      </Suspense>
      <BackToTop />
      <SettingsHandler />
      <Login />
      <Register />
      <InquiryModal />
      <CompareBar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: "8px", fontSize: "14px" },
        }}
      />
    </>
  );
}
