"use client";
import { useEffect } from "react";

/**
 * Injects admin-managed scripts into the document head on the client side.
 * This handles arbitrary script tags from the admin Scripts Manager.
 */
export default function ScriptInjector({ scripts }) {
  useEffect(() => {
    if (!scripts) return;

    const container = document.createElement("div");
    container.innerHTML = scripts;

    const scriptElements = container.querySelectorAll("script");
    const injected = [];

    scriptElements.forEach((originalScript) => {
      const newScript = document.createElement("script");

      Array.from(originalScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      if (originalScript.textContent) {
        newScript.textContent = originalScript.textContent;
      }

      newScript.setAttribute("data-injected-by", "admin-scripts-manager");
      document.head.appendChild(newScript);
      injected.push(newScript);
    });

    return () => {
      injected.forEach((s) => {
        try { s.parentNode?.removeChild(s); } catch { /* ignore */ }
      });
    };
  }, [scripts]);

  return null;
}
