"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const sampleProducts = [
  {
    id: 1,
    name: "Kitchen Gas Lighter",
    category: "Kitchen Appliances",
    price: 150,
    image: "/lighter.jpg",
  },
  {
    id: 2,
    name: "Knife Set",
    category: "Home Appliances",
    price: 800,
    image: "/knife.jpg",
  },
  {
    id: 3,
    name: "Steel Hanger",
    category: "Home Appliances",
    price: 200,
    image: "/hanger.jpg",
  },
  {
    id: 4,
    name: "Scissors Pack",
    category: "Office & Workspace",
    price: 120,
    image: "/scissors.jpg",
  },
  {
    id: 5,
    name: "Bulk Kitchen Tools Pack",
    category: "Bulk Deals",
    price: 1500,
    image: "/bulk.jpg",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return sampleProducts;

    return sampleProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 24px 60px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#4f46e5",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          ← Back to Home
        </Link>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #eef2ff, #ffffff)",
          border: "1px solid #e5e7eb",
          borderRadius: "20px",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "800",
            marginBottom: "12px",
            color: "#111827",
          }}
        >
          Search Products
        </h1>

        <p
          style={{
            marginBottom: "20px",
            color: "#4b5563",
            fontSize: "18px",
            maxWidth: "700px",
          }}
        >
          Browse Satguru Store items by searching product names or categories.
        </p>

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "520px",
            padding: "14px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            fontSize: "16px",
            outline: "none",
            backgroundColor: "#fff",
          }}
        />
      </div>

      <div
        style={{
          marginBottom: "18px",
          color: "#374151",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                transition: "0.2s ease",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "14px",
                  backgroundColor: "#f3f4f6",
                }}
              />

              <div
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                {item.category}
              </div>

              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {item.name}
              </h2>

              <p
                style={{
                  margin: "0 0 16px 0",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#111827",
                }}
              >
                ₹{item.price.toLocaleString("en-IN")}
              </p>

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: "#4f46e5",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                View Product
              </button>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "24px",
              border: "1px dashed #d1d5db",
              borderRadius: "16px",
              color: "#6b7280",
              backgroundColor: "#fff",
            }}
          >
            No matching products found.
          </div>
        )}
      </div>
    </main>
  );
}