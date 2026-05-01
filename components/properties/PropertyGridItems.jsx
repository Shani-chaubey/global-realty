"use client";
import React from "react";
import PropertyCard from "./PropertyCard";

export default function PropertyGridItems({ properties = [], showItems }) {
  const items = showItems ? properties.slice(0, showItems) : properties;

  if (!items.length) return null;

  return (
    <>
      {items.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </>
  );
}
